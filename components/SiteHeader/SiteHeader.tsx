import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';

const SECTIONS = [
  { index: '01', label: 'Highlights', href: '#highlights' },
  { index: '02', label: 'Work', href: '#work' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

/**
 * Carries no position of its own. It shares the page's pinned sheet with the hero, which is what
 * keeps the two from ever moving against each other, and that sheet owns the sticking and the
 * layer. Centring and gutter come from the same place, so neither is repeated here.
 *
 * It passes over nothing now, so it needs no blend and takes the ordinary ink tokens.
 */
const siteHeader = tv({
  slots: {
    root: 'flex items-center gap-10 pt-10 pb-4 text-ink',
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
