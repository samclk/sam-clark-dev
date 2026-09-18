/**
 * Lays the wet ink shader over live text without the text's own component knowing about it.
 *
 * It takes a selector rather than an element, so the component it decorates stays a Server
 * Component: its markup arrives here as children and only this wrapper crosses to the client. The
 * children must be static markup, because a target is bound once and never looked up again.
 *
 * The DOM text stays exactly where it is and only turns transparent, so selection, find-in-page,
 * screen readers and the prerendered HTML are untouched, and the canvas on top is decorative. That
 * transparency is the whole risk in this component: text that is hidden with nothing drawn over it
 * is gone from the page with no error anywhere. So the element is marked, and therefore hidden,
 * only once a copy of its glyphs has actually been rasterised, and the mark comes straight back off
 * if the GL context is lost. Under reduced motion, without WebGL, without the observers, or when
 * the text cannot be copied faithfully, nothing mounts and the page is untouched.
 */
'use client';
import * as React from 'react';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';
import { createSketch, readColor, type Sketch } from './gl';
import { BLEED, drawText } from './textToCanvas';
import { WET_INK } from './shader';

/** Seconds the drying ramp takes, and how long the ripple lags the cursor. */
const DRY_SECONDS = 1.7;
const DRAG_SECONDS = 1.9;
/** Damped, not ramped, so neither kicks at the start nor snaps at the end. */
const HOVER_TAU = 0.18;
const AIM_TAU = 0.05;
/** Without this the ripple's shape tracks raw cursor velocity while its body still crawls. */
const TRAIL_TAU = 0.12;
/** Below this a damped value is done, so the loop sleeps instead of chasing the last fraction. */
const SETTLED = 0.002;

type WetInkProps = {
  children: React.ReactNode;
  /** Selector for the text to cover, resolved inside this wrapper. */
  target: string;
  /** Whether the ink dries on arrival. Text that is already on the page starts dry. */
  settle?: boolean;
};

type Bound = {
  sketch: Sketch;
  /** CSS pixel size of the canvas, which is what the shader measures distances in. */
  size: [number, number];
  progress: number;
  hover: number;
  arrived: boolean;
  hovered: boolean;
  /** Where the cursor actually is, straight off the last event. */
  raw: [number, number];
  /** Where the cursor is once the event jitter is damped out. The trail measures from here. */
  aim: [number, number];
  /** Where the ripple thinks it is, which lags much further behind. */
  pointer: [number, number];
  /** How far behind it is, damped, which is what stretches the ripple along the axis of travel. */
  trail: [number, number];
  /** False until the first move, so the lag does not swim in from the corner on the way in. */
  aimed: boolean;
};

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

const ramp = (value: number, target: number, dt: number, duration: number) => {
  const delta = (dt / duration) * (target > value ? 1 : -1);
  return target > value ? Math.min(target, value + delta) : Math.max(target, value + delta);
};

/**
 * Exponential damping toward a target. Framerate independent, unlike a fixed fraction per frame,
 * which would drag twice as hard on a 120Hz display as on a 60Hz one.
 */
const damp = (value: number, target: number, dt: number, tau: number) =>
  value + (target - value) * (1 - Math.exp(-dt / tau));

export const WetInk = ({ children, target, settle = false }: WetInkProps) => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion) return;
    if (!('ResizeObserver' in window) || !('IntersectionObserver' in window)) return;

    const ink = readColor('--color-ink');
    const accent = readColor('--color-accent');

    const bounds: Bound[] = [];
    const cleanups: Array<() => void> = [];
    let frame = 0;
    let last = 0;
    let cancelled = false;

    const render = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      let busy = false;

      for (const bound of bounds) {
        const dry = bound.arrived ? 1 : 0;
        const hovered = bound.hovered ? 1 : 0;
        bound.progress = ramp(bound.progress, dry, dt, DRY_SECONDS);
        bound.hover = damp(bound.hover, hovered, dt, HOVER_TAU);
        if (Math.abs(bound.hover - hovered) < SETTLED) bound.hover = hovered;
        bound.aim = [damp(bound.aim[0], bound.raw[0], dt, AIM_TAU), damp(bound.aim[1], bound.raw[1], dt, AIM_TAU)];
        bound.pointer = [
          damp(bound.pointer[0], bound.aim[0], dt, DRAG_SECONDS),
          damp(bound.pointer[1], bound.aim[1], dt, DRAG_SECONDS),
        ];

        // held until the ripple is finished rather than merely invisible, so a cursor that leaves
        // and returns inside the fade picks it up where it was instead of teleporting it
        if (!bound.hovered && bound.hover === 0) bound.aimed = false;

        const chase: [number, number] = [bound.aim[0] - bound.pointer[0], bound.aim[1] - bound.pointer[1]];
        bound.trail = [damp(bound.trail[0], chase[0], dt, TRAIL_TAU), damp(bound.trail[1], chase[1], dt, TRAIL_TAU)];

        // a held pointer keeps the ripple moving, so a finished ramp must not stop the loop under it
        if (bound.hovered || bound.progress !== dry || bound.hover !== hovered) busy = true;
        // Only while the ripple is still visible: with the lag at DRAG_SECONDS the trail takes
        // about 13s to fall under half a pixel, long after the hover fade has taken it to nothing.
        if (bound.hover > 0 && Math.hypot(bound.trail[0], bound.trail[1]) > 0.5) busy = true;

        bound.sketch.draw({
          uRes: bound.size,
          uTime: now / 1000,
          uPointer: bound.pointer,
          uTrail: bound.trail,
          uHover: bound.hover,
          uProgress: easeOutCubic(bound.progress),
          uInk: ink,
          uAccent: accent,
        });
      }

      frame = busy ? requestAnimationFrame(render) : 0;
    };

    const wake = () => {
      if (frame || cancelled) return;
      last = 0;
      frame = requestAnimationFrame(render);
    };

    const bind = (element: HTMLElement) => {
      const sketch = createSketch(WET_INK);
      if (!sketch) return;

      const texture = document.createElement('canvas');
      const bound: Bound = {
        sketch,
        size: [1, 1],
        progress: settle ? 0 : 1,
        hover: 0,
        arrived: !settle,
        hovered: false,
        raw: [0, 0],
        aim: [0, 0],
        pointer: [0, 0],
        trail: [0, 0],
        aimed: false,
      };

      /** False whenever the glyphs could not be copied, which must leave the real text showing. */
      const paint = () => {
        const image = drawText(element, texture);
        if (!image) return false;
        sketch.resize(image.width, image.height);
        if (!sketch.setTexture(image.canvas)) return false;
        bound.size = [image.width, image.height];
        return true;
      };

      const positionWasStatic = getComputedStyle(element).position === 'static';
      if (positionWasStatic) element.style.position = 'relative';
      sketch.canvas.ariaHidden = 'true';
      Object.assign(sketch.canvas.style, {
        position: 'absolute',
        left: `${-BLEED}px`,
        top: `${-BLEED}px`,
        pointerEvents: 'none',
      });
      element.append(sketch.canvas);

      if (!paint()) {
        if (positionWasStatic) element.style.position = '';
        sketch.destroy();
        return;
      }
      // only now is there something to look at, so only now may the real text go
      element.dataset.wetInk = 'on';
      bounds.push(bound);

      const onEnter = () => {
        bound.hovered = true;
        wake();
      };
      const onLeave = () => {
        bound.hovered = false;
        wake();
      };
      const onMove = (event: PointerEvent) => {
        const rect = sketch.canvas.getBoundingClientRect();
        bound.raw = [
          event.clientX - rect.left,
          // y-up, to match the flipped texture the shader samples
          bound.size[1] - (event.clientY - rect.top),
        ];
        if (!bound.aimed) {
          bound.aim = [...bound.raw];
          bound.pointer = [...bound.raw];
          bound.trail = [0, 0];
          bound.aimed = true;
        }
        wake();
      };
      // a lost context leaves nothing to draw the glyphs, so the real text has to come back
      const onContextLost = () => {
        delete element.dataset.wetInk;
        bound.hovered = false;
      };

      element.addEventListener('pointerenter', onEnter);
      element.addEventListener('pointerleave', onLeave);
      element.addEventListener('pointermove', onMove);
      sketch.canvas.addEventListener('webglcontextlost', onContextLost);

      // a window drag fires this every frame, and a repaint is a full re-measure and re-upload
      let repaint = 0;
      const resizeObserver = new ResizeObserver(() => {
        if (repaint) return;
        repaint = requestAnimationFrame(() => {
          repaint = 0;
          if (paint()) wake();
          else onContextLost();
        });
      });
      resizeObserver.observe(element);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          bound.arrived = true;
          intersectionObserver.disconnect();
          wake();
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
      );
      intersectionObserver.observe(element);

      cleanups.push(() => {
        element.removeEventListener('pointerenter', onEnter);
        element.removeEventListener('pointerleave', onLeave);
        element.removeEventListener('pointermove', onMove);
        sketch.canvas.removeEventListener('webglcontextlost', onContextLost);
        if (repaint) cancelAnimationFrame(repaint);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        delete element.dataset.wetInk;
        if (positionWasStatic) element.style.position = '';
        sketch.destroy();
      });
    };

    // the runs are measured against the loaded face, so a fallback metric never gets baked in
    const start = () => {
      if (cancelled) return;
      for (const element of root.querySelectorAll<HTMLElement>(target)) {
        // one target failing must not abandon the rest, or leave a half-bound element hidden
        try {
          bind(element);
        } catch {
          delete element.dataset.wetInk;
        }
      }
      wake();
    };
    void document.fonts.ready.then(start);

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      for (const cleanup of cleanups) cleanup();
    };
  }, [target, settle, prefersReducedMotion]);

  // contents, so neither call site gains a layout box it did not have before
  return (
    <div ref={rootRef} style={{ display: 'contents' }}>
      {children}
    </div>
  );
};
