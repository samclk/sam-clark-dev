'use client';
import type { ReactNode } from 'react';
import { useHeaderMode, type HeaderMode } from '@/utils/useHeaderMode';

type HeaderLayerProps = {
  /**
   * The complete class list for each mode, swapped rather than appended so the translate and
   * z-index utilities never sit on the element together and let source order decide. All three are
   * resolved by tailwind-variants on the server, which keeps it out of this bundle.
   */
  classNames: Record<HeaderMode, string>;
  /** Selector for the panel's leading rule, which is what the mode is measured against. */
  edge: string;
  children: ReactNode;
};

export const HeaderLayer = ({ classNames, edge, children }: HeaderLayerProps) => {
  const mode = useHeaderMode(edge);

  return <header className={classNames[mode]}>{children}</header>;
};
