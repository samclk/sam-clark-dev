import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';

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
 * It pins with the hero rather than above it, in the layer the sliding panel covers, so the two
 * behave as one block: the panel passes over both and the scroll back up returns both together. A
 * header that floated free would slide in on its own and read as a second movement.
 *
 * It sits one step above the hero and well below the panel. The hero's own top padding covers the
 * nav once pinned, and a tie on z-index hands every click to whichever came later in the DOM.
 *
 * Keyboard focus lifts it clear of the panel, since a nav link focused while the panel covered it
 * would otherwise take focus somewhere invisible.
 */
const siteHeader = tv({
  slots: {
    root: 'sticky top-0 z-[1] mx-auto flex max-w-[1440px] items-center gap-10 px-gutter pt-10 pb-4 text-white mix-blend-difference focus-within:z-50',
    wordmark: 'ln mono font-medium tracking-[0.14em]',
    nav: 'ml-auto hidden gap-[30px] nav:flex',
    link: 'group ln py-3.5 mono',
    index: 'mr-[7px] text-white/55 transition-colors duration-[420ms] group-hover:text-white',
    // A standing call to action, not a position indicator: it carries no index because it never
    // tracks the section you are in.
    pill: 'ml-auto rounded-full border border-white/35 px-4 py-3.5 mono nav:hidden',
    clock: 'hidden min-w-[168px] text-right mono text-white/70 clock:block',
  },
});

const { root, wordmark, nav, link, index, pill, clock } = siteHeader();

export const SiteHeader = () => {
  return (
    <header className={root()}>
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
        Contact
      </a>

      <p className={clock()}>
        Local time <Clock />
      </p>
    </header>
  );
};
