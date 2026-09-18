'use client';
import * as React from 'react';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';

/** Ignores sub-pixel drift and the rubber-band bounce at either end of the page. */
const THRESHOLD = 8;

/** Below this the header always shows, so it is never stranded off-screen at the top of the page. */
const ALWAYS_VISIBLE_ABOVE = 140;

export const useHideOnScroll = (): boolean => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    if (prefersReducedMotion) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) < THRESHOLD) return;

      setHidden(delta > 0 && y > ALWAYS_VISIBLE_ABOVE);
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prefersReducedMotion]);

  return hidden;
};
