'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as React from 'react';
import { ScrambleTextPlugin } from 'gsap/all';

gsap.registerPlugin(ScrambleTextPlugin);

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pageWrapperRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to('#noise', {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
      });

      tl.fromTo(
        '#pre-loader-text',
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        },
      );

      tl.to(
        '#pre-loader-bar',
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 2,
          ease: 'power2.inOut',
        },
        '>-0.3',
      );

      tl.to('#pre-loader', {
        clipPath: 'inset(0 0% 100% 0)',
        duration: 0.6,
        ease: 'power2.inOut',
      });

      tl.to('#blur-image', {
        opacity: 1,
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
      tl.to(
        '#overlay-container',
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.inOut',
        },
        '>-0.4',
      );
      tl.to(
        '#coords',
        {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.inOut',
        },
        '<0.1',
      );
      tl.to(
        '#coords',
        {
          scrambleText: {
            text: '52.7517° N, 0.4023° E',
            chars: '0123456789',
            speed: 0.3,
          },
          duration: 3,
        },
        '<0.1',
      );

      tl.to(
        '#overlay-content',
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '>-2.2',
      );
    },
    { scope: pageWrapperRef },
  );
  return (
    <div className="relative h-svh w-screen overflow-hidden" ref={pageWrapperRef}>
      {children}
      <div
        id="noise"
        className='animate-noise user-select-none pointer-events-none fixed inset-0 top-1/2 left-1/2 z-50 h-[10000px] w-[10000px] -translate-x-1/2 -translate-y-1/2 bg-[url("/noise.png")] bg-repeat opacity-0 lg:h-[400vh] lg:w-[400vw]'
      ></div>
    </div>
  );
};
