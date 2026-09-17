'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as React from 'react';
import { ScrambleTextPlugin } from 'gsap/all';
import { tv } from 'tailwind-variants';
import { animationIds } from '@/utils/animationIds';
import { markPreloaderComplete } from '@/utils/preloader';

gsap.registerPlugin(ScrambleTextPlugin);

const id = (key: keyof typeof animationIds) => `#${animationIds[key]}`;

const pageWrapper = tv({
  slots: {
    root: 'relative h-svh w-screen overflow-hidden',
    noise:
      'pointer-events-none fixed inset-0 top-1/2 left-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 animate-noise bg-[url("/noise.webp")] bg-repeat opacity-0 select-none motion-reduce:animate-none lg:block lg:h-[400vh] lg:w-[400vw]',
  },
});

const { root, noise } = pageWrapper();

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pageWrapperRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline();

        tl.to(id('noise'), {
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
        });

        tl.fromTo(
          id('preLoaderText'),
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
          id('preLoaderBar'),
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 2,
            ease: 'power2.inOut',
          },
          '>-0.3',
        );

        tl.to(id('preLoader'), {
          clipPath: 'inset(0 0% 100% 0)',
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: markPreloaderComplete,
        });

        tl.to(
          id('topBar'),
          {
            translateY: 0,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '<',
        );

        tl.to(
          id('topBarContent'),
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '>-0.2',
        );
        tl.to(
          id('overlayContainer'),
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power2.inOut',
          },
          '>-0.4',
        );
        tl.to(
          id('coords'),
          {
            opacity: 1,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          '<0.1',
        );
        tl.to(
          id('coords'),
          {
            scrambleText: {
              text: '{original}',
              chars: '0123456789',
              speed: 0.3,
            },
            duration: 3,
          },
          '<0.1',
        );

        tl.to(
          id('overlayContent'),
          {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '>-2.2',
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set([id('noise'), id('topBarContent'), id('overlayContent'), id('coords')], { opacity: 1 });
        gsap.set(id('topBar'), { translateY: 0 });
        gsap.set(id('overlayContainer'), { clipPath: 'inset(0 0% 0 0)' });
        gsap.set(id('preLoader'), { display: 'none' });
        markPreloaderComplete();
      });
    },
    { scope: pageWrapperRef },
  );

  return (
    <div className={root()} ref={pageWrapperRef}>
      {children}
      <div id={animationIds.noise} className={noise()}></div>
    </div>
  );
};
