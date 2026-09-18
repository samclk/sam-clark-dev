'use client';
import type { ReactNode } from 'react';
import { useHideOnScroll } from '@/utils/useHideOnScroll';

type HideOnScrollProps = {
  /** The complete class list while the header is showing. */
  className: string;
  /**
   * The complete class list while it is retreating. Swapped for `className` rather than appended, so
   * the two translate utilities never sit on the element together and let source order decide.
   * Both strings are resolved by tailwind-variants on the server, which keeps it out of this bundle.
   */
  hiddenClassName: string;
  children: ReactNode;
};

export const HideOnScroll = ({ className, hiddenClassName, children }: HideOnScrollProps) => {
  const hidden = useHideOnScroll();

  return <header className={hidden ? hiddenClassName : className}>{children}</header>;
};
