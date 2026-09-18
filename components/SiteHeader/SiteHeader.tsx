import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';

const SECTIONS = [
  { index: '01', label: 'Highlights', href: '#highlights' },
  { index: '02', label: 'Work', href: '#work' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

/**
 * Pins with the hero as one block: the sliding panel covers both, and the scroll back up returns
 * both together. It passes over nothing, so it needs no blend and takes the ordinary ink tokens.
 *
 * Fixed rather than sticky, and so out of flow: a sticky header takes flow space, which would start
 * the hero below it and slide the headline that far before it pinned. The hero pays for the space
 * with its own top padding instead, so the two are locked together from the first pixel.
 *
 * It sits one step above the hero and well below the panel. The hero's own top padding covers the
 * nav, and a tie on z-index hands every click to whichever came later in the DOM.
 *
 * Keyboard focus lifts it clear of the panel, since a nav link focused while the panel covered it
 * would otherwise take focus somewhere invisible.
 */
const siteHeader = tv({
  slots: {
    root: 'fixed inset-x-0 top-0 z-[1] mx-auto flex max-w-[1440px] items-center gap-10 px-gutter pt-10 pb-4 text-ink focus-within:z-50',
    wordmark: 'ln mono font-medium tracking-[0.14em]',
    nav: 'ml-auto hidden gap-[30px] nav:flex',
    link: 'group ln py-3.5 mono',
    index: 'mr-[7px] text-faint transition-colors duration-[420ms] group-hover:text-ink',
    // A standing call to action, not a position indicator: it carries no index because it never
    // tracks the section you are in.
    pill: 'ml-auto rounded-full border border-hairline px-4 py-3.5 mono nav:hidden',
    clock: 'hidden min-w-[168px] text-right mono text-quiet clock:block',
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
