'use client';
import * as React from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (onStoreChange: () => void) => {
  const query = window.matchMedia(QUERY);
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
};

export const usePrefersReducedMotion = (): boolean =>
  React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
