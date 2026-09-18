'use client';
import * as React from 'react';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';

/** Ignores sub-pixel drift and the rubber-band bounce at either end of the page. */
const THRESHOLD = 8;

/**
 * How far the panel's rule travels past the top before the header leaves the hero's layer. Inside
 * it the rule is itself the thing arriving, and a header sliding in to meet it reads as two edges
 * competing for the same line.
 */
const DETACH = 100;

/** `attached` rides with the pinned hero and lets the panel pass over it. The other two float above. */
export type HeaderMode = 'attached' | 'shown' | 'hidden';

/**
 * Takes a selector rather than a ref, because the element it measures is the panel's leading rule,
 * which belongs to a Server Component several layers away. A missing one floats the header, so a
 * page without a panel still gets a usable nav rather than one parked under something.
 */
export const useHeaderMode = (edgeSelector: string): HeaderMode => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [detached, setDetached] = React.useState(false);
  const [retreating, setRetreating] = React.useState(false);

  React.useEffect(() => {
    const edge = document.querySelector(edgeSelector);
    if (!edge) {
      setDetached(true);
      return;
    }

    let lastY = window.scrollY;
    let frame = 0;

    // a rect read per frame rather than per event, so a trackpad fling does not thrash layout
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setDetached(edge.getBoundingClientRect().top < -DETACH);

      const delta = y - lastY;
      if (Math.abs(delta) < THRESHOLD) return;
      setRetreating(!prefersReducedMotion && delta > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [edgeSelector, prefersReducedMotion]);

  if (!detached) return 'attached';
  return retreating ? 'hidden' : 'shown';
};
