'use client';
import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';
import { useHideOnScroll } from '@/utils/useHideOnScroll';

const SECTIONS = [
  { index: '01', label: 'Highlights', href: '#highlights' },
  { index: '02', label: 'Work', href: '#work' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

/**
 * Sticky with no ground of its own. Under mix-blend-difference the source has to be white to land
 * near ink on paper, and the same white inverts to near-paper over a dark image, so the header stays
 * legible over anything it passes. Hierarchy comes from alpha rather than the grey tokens, which
 * would inverse: the darker the source, the lighter the result.
 *
 * It retreats on the way down and comes back on the way up, because with no ground of its own it
 * collides with whatever it sits on. Keyboard focus brings it back regardless of scroll direction.
 */
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

export const SiteHeader = () => {
  const hidden = useHideOnScroll();

  return (
    <header className={root({ hidden })}>
      <a className={wordmark()} href="#top">
        CLK Studio
      </a>

      <nav className={nav()} aria-label="Sections of this page">
        {SECTIONS.map((section) => (
          <a key={section.href} className={link()} href={section.href}>
            <span className={index()}>{section.index}</span>
            {section.label}
          </a>
        ))}
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
