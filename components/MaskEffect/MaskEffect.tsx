'use client';

import * as React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MaskEffect = () => {
  const maskRef = React.useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!maskRef.current) return;

    // Store numeric values (without % unit) for GSAP animation
    const xVar = '--x-num';
    const yVar = '--y-num';

    // Use quickTo for smooth, performant animation with easing
    // quickTo reuses the same tween internally, avoiding performance overhead
    const setX = gsap.quickTo(maskRef.current, xVar, {
      duration: 1.4,
      ease: 'power2.out',
    });
    const setY = gsap.quickTo(maskRef.current, yVar, {
      duration: 1.4,
      ease: 'power2.out',
    });

    // Update CSS variables with % unit on each GSAP tick
    const updateCSSVars = () => {
      if (!maskRef.current) return;
      const x = gsap.getProperty(maskRef.current, xVar) as number;
      const y = gsap.getProperty(maskRef.current, yVar) as number;
      maskRef.current.style.setProperty('--x', `${x}%`);
      maskRef.current.style.setProperty('--y', `${y}%`);
    };

    // Update CSS vars whenever GSAP animates the numeric values
    const tickerId = gsap.ticker.add(updateCSSVars);

    const handleMouseMove = (e: MouseEvent) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;

      // quickTo handles throttling and smooth easing internally
      setX(xPercent);
      setY(yPercent);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerId);
    };
  });

  return (
    <div className="user-select-none pointer-events-none absolute h-screen w-screen">
      <Image
        src="/me/me-mobile.jpg"
        id="blur-image"
        alt="Me"
        width={1080}
        height={1920}
        priority
        className="h-full w-full object-cover object-center opacity-0 lg:hidden"
      />
      <Image
        src="/me/me-blur.jpg"
        id="blur-image"
        alt="Me"
        width={1920}
        height={1080}
        priority
        className="hidden h-full w-full object-cover object-center opacity-0 lg:block"
      />
      <Image
        ref={maskRef}
        src="/me/me.jpg"
        id="clear-image"
        alt="Me"
        width={1920}
        height={1080}
        priority
        className="mask absolute top-0 left-0 hidden h-full w-full object-cover object-center opacity-0 lg:block"
        style={
          {
            maskImage: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0%, black 10%, transparent 25%)',
            WebkitMaskImage:
              'radial-gradient(circle at var(--x, 50%) var(--y, 50%), black 0%, black 10%, transparent 25%)',
            // Initialize CSS variables (numeric for GSAP, with % for CSS)
            '--x-num': 50,
            '--y-num': 50,
            '--x': '50%',
            '--y': '50%',
          } as React.CSSProperties
        }
      />
    </div>
  );
};
