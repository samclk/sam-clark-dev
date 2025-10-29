'use client';

import * as React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const MaskEffect = () => {
  const maskRef = React.useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const updateMaskPosition = (e: MouseEvent) => {
      if (!maskRef.current) return;

      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;

      gsap.to(maskRef.current, {
        maskImage: `radial-gradient(circle at ${xPercent}% ${yPercent}%, black 0%, black 10%, transparent 25%)`,
        duration: 0.2,
        ease: 'power2.inOut',
      });
    };

    window.addEventListener('mousemove', updateMaskPosition);

    return () => {
      window.removeEventListener('mousemove', updateMaskPosition);
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
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 10%, transparent 25%)',
        }}
      />
    </div>
  );
};
