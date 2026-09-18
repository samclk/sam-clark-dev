'use client';
import * as React from 'react';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';

type TileVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Playback follows visibility rather than the autoplay attribute, which fires once, is declined
 * often enough to matter, and never tries again. Nothing downloads until the tile is scrolled to.
 */
export const TileVideo = ({ src, poster, className }: TileVideoProps) => {
  const ref = React.useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const play = () => void video.play().catch(() => undefined);

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
};
