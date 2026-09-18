'use client';
import * as React from 'react';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';
import { createSketch, readColor } from './gl';
import { BLEED, drawText } from './textToCanvas';
import { WET_INK } from './shader';

/**
 * Lays the wet ink shader over live text without the text's own component knowing about it.
 *
 * It takes a selector rather than an element, so the component it decorates stays a Server
 * Component: its markup arrives here as children and only this wrapper crosses to the client. The
 * DOM text stays exactly where it is and only turns transparent, so selection, find-in-page and
 * screen readers are untouched, and the canvas on top is decorative. Nothing mounts under reduced
 * motion, when WebGL is missing, or if the text cannot be measured, and in each case the page is
 * simply the page.
 */

/** Seconds the drying ramp takes, and how long the ripple lags the cursor. */
const DRY_SECONDS = 1.7;
const DRAG_SECONDS = 0.8;
const HOVER_SECONDS = 0.38;

type WetInkProps = {
  children: React.ReactNode;
  /** Selector for the text to cover, resolved inside this wrapper. */
  target: string;
  /** Whether the ink dries on arrival. Text that is already on the page starts dry. */
  settle?: boolean;
  className?: string;
};

type Bound = {
  element: HTMLElement;
  sketch: NonNullable<ReturnType<typeof createSketch>>;
  texture: HTMLCanvasElement;
  progress: number;
  hover: number;
  arrived: boolean;
  hovered: boolean;
  /** Where the cursor is. */
  aim: [number, number];
  /** Where the ripple thinks it is, which lags behind. */
  pointer: [number, number];
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

export const WetInk = ({ children, target, settle = false, className }: WetInkProps) => {
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
        bound.hover = ramp(bound.hover, hovered, dt, HOVER_SECONDS);
        bound.pointer = [
          damp(bound.pointer[0], bound.aim[0], dt, DRAG_SECONDS),
          damp(bound.pointer[1], bound.aim[1], dt, DRAG_SECONDS),
        ];

        const trail: [number, number] = [bound.aim[0] - bound.pointer[0], bound.aim[1] - bound.pointer[1]];
        // a held pointer keeps the ripple moving, so a finished ramp must not stop the loop under it
        if (bound.hovered || bound.progress !== dry || bound.hover !== hovered) busy = true;
        if (Math.hypot(trail[0], trail[1]) > 0.5) busy = true;

        bound.sketch.draw({
          uRes: [bound.sketch.canvas.width, bound.sketch.canvas.height],
          uTime: now / 1000,
          uPointer: bound.pointer,
          uTrail: trail,
          uHover: easeOutCubic(bound.hover),
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
      const image = drawText(element, texture);
      // no measurable text means no canvas and no transparent text, so the page loses nothing
      if (!image) {
        sketch.destroy();
        return;
      }

      const bound: Bound = {
        element,
        sketch,
        texture,
        progress: settle ? 0 : 1,
        hover: 0,
        arrived: !settle,
        hovered: false,
        aim: [0, 0],
        pointer: [0, 0],
        aimed: false,
      };

      const paint = () => {
        const next = drawText(element, texture);
        if (!next) return;
        sketch.resize(next.width, next.height);
        sketch.setTexture(next.canvas);
      };

      if (getComputedStyle(element).position === 'static') element.style.position = 'relative';
      Object.assign(sketch.canvas.style, {
        position: 'absolute',
        left: `${-BLEED}px`,
        top: `${-BLEED}px`,
        pointerEvents: 'none',
      });
      element.append(sketch.canvas);
      element.dataset.wetInk = 'on';
      paint();
      bounds.push(bound);

      const onEnter = () => {
        bound.hovered = true;
        wake();
      };
      const onLeave = () => {
        bound.hovered = false;
        bound.aimed = false;
        wake();
      };
      const onMove = (event: PointerEvent) => {
        const rect = sketch.canvas.getBoundingClientRect();
        const scale = sketch.canvas.width / Math.max(rect.width, 1);
        bound.aim = [
          (event.clientX - rect.left) * scale,
          // y-up, to match the flipped texture the shader samples
          sketch.canvas.height - (event.clientY - rect.top) * scale,
        ];
        if (!bound.aimed) {
          bound.pointer = [...bound.aim];
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

      const resizeObserver = new ResizeObserver(() => {
        paint();
        wake();
      });
      resizeObserver.observe(element);

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          bound.arrived = true;
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
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        delete element.dataset.wetInk;
        element.style.position = '';
        sketch.destroy();
      });
    };

    // the runs are measured against the loaded face, so a fallback metric never gets baked in
    const start = () => {
      if (cancelled) return;
      root.querySelectorAll<HTMLElement>(target).forEach(bind);
      wake();
    };
    document.fonts ? document.fonts.ready.then(start) : start();

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [target, settle, prefersReducedMotion]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
};
