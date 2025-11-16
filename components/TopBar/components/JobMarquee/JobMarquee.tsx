'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SLIDES = ['Senior Full Stack Developer', 'Contractor at Intercom', 'Available from June 2026'];

export const JobMarquee = () => {
  const [emblaRef] = useEmblaCarousel({ axis: 'y', loop: true, watchDrag: false }, [Autoplay()]);
  return (
    <section>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[15px] flex-col items-start">
          {SLIDES.map((slide, index) => (
            <div className="min-h-0 flex-[0_0_100%]" key={index}>
              <div>{slide}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
