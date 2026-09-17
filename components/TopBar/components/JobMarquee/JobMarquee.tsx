'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { tv } from 'tailwind-variants';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';

const SLIDES = ['Senior Full Stack Developer', 'Contractor at Intercom', 'Available from June 2026'];

const jobMarquee = tv({
  slots: {
    root: 'overflow-hidden',
    track: 'flex h-[15px] flex-col items-start',
    slide: 'min-h-0 flex-[0_0_100%]',
  },
});

const { root, track, slide } = jobMarquee();

export const JobMarquee = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [emblaRef] = useEmblaCarousel(
    { axis: 'y', loop: true, watchDrag: false },
    prefersReducedMotion ? [] : [Autoplay()],
  );

  return (
    <div className={root()} ref={emblaRef}>
      <div className={track()}>
        {SLIDES.map((job) => (
          <div className={slide()} key={job}>
            <div>{job}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
