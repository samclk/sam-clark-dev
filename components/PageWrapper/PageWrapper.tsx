'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as React from 'react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pageWrapperRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from('#blur-image', {
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut',
      });

      tl.from(
        '#blur-image',
        {
          scale: 1.2,
          duration: 2,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(
        '#clear-image',
        {
          opacity: 1,
          duration: 0.8,
          ease: 'circ.inOut',
        },
        '>-0.2',
      );

      tl.to(
        '#top-bar',
        {
          translateY: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '<',
      );

      tl.to(
        '#top-bar-content',
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '>-0.2',
      );
      tl.from(
        '#overlay-container',
        {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.4,
          ease: 'circ.inOut',
        },
        '>-0.4',
      );

      tl.to(
        '#overlay-content',
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '>-0.1',
      );
    },
    { scope: pageWrapperRef },
  );
  return (
    <div className="relative h-screen w-screen overflow-hidden" ref={pageWrapperRef}>
      {children}
    </div>
  );
};
