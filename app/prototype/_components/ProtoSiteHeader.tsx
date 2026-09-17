'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';
import { useHideOnScroll } from '@/utils/useHideOnScroll';

/**
 * PROTOTYPE — throwaway. The real sticky header, marking whichever section is crossing the middle.
 *
 * The active state is alpha, not colour. Under mix-blend-difference the source is what gets
 * differenced, so an accent source lands on cyan over paper and on something else again over a dark
 * image. Full white is the only value that reads as emphasis everywhere the header passes.
 */

const SECTIONS = [
  { index: '01', label: 'Highlights', href: '#highlights' },
  { index: '02', label: 'Work', href: '#work' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

const siteHeader = tv({
  slots: {
    root: 'sticky top-0 z-50 mx-auto flex max-w-[1440px] items-center gap-10 px-gutter pt-10 pb-4 text-white mix-blend-difference transition-transform duration-[420ms] ease-brand focus-within:translate-y-0',
    wordmark: 'ln mono font-medium tracking-[0.14em]',
    nav: 'ml-auto hidden gap-[30px] nav:flex',
    link: 'group ln py-3.5 mono',
    index: 'mr-[7px] text-white/55 transition-colors duration-[420ms] group-hover:text-white',
    pill: 'ml-auto rounded-full border border-white/35 px-4 py-3.5 mono nav:hidden',
    pillIndex: 'mr-[7px] text-white/55',
    clock: 'hidden min-w-[168px] text-right mono text-white/70 clock:block',
  },
  variants: {
    hidden: {
      true: { root: '-translate-y-full' },
      false: { root: 'translate-y-0' },
    },
  },
});

const { root, wordmark, nav, link, index, pill, pillIndex, clock } = siteHeader();

/** A band across the middle of the viewport: only the section under it counts as current. */
const ROOT_MARGIN = '-45% 0px -50% 0px';

const useActiveSection = () => {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        setActive(SECTIONS.find((section) => visible.has(section.href))?.href ?? null);
      },
      { rootMargin: ROOT_MARGIN },
    );

    for (const section of SECTIONS) {
      const element = document.querySelector(section.href);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return active;
};

export const ProtoSiteHeader = () => {
  const hidden = useHideOnScroll();
  const active = useActiveSection();

  return (
    <header className={root({ hidden })}>
      <a className={wordmark()} href="#top">
        CLK Studio
      </a>

      <nav className={nav()} aria-label="Sections of this page">
        {SECTIONS.map((section) => {
          const isActive = section.href === active;
          return (
            <a
              key={section.href}
              className={link()}
              href={section.href}
              data-proto-active={isActive}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className={index({ className: isActive ? 'text-white' : undefined })}>{section.index}</span>
              {section.label}
            </a>
          );
        })}
      </nav>

      <a className={pill()} href="#contact">
        <span className={pillIndex()}>04</span>
        Contact
      </a>

      <p className={clock()}>
        Local time <Clock />
      </p>
    </header>
  );
};
