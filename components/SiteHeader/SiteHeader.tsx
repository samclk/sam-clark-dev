import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';

const SECTIONS = [
  { index: '01', label: 'Highlights', href: '#highlights' },
  { index: '02', label: 'Work', href: '#work' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Contact', href: '#contact' },
];

const siteHeader = tv({
  slots: {
    root: 'mx-auto flex max-w-[1440px] items-center gap-10 px-gutter pt-10',
    wordmark: 'ln mono font-medium tracking-[0.14em]',
    nav: 'ml-auto hidden gap-[30px] nav:flex',
    link: 'group ln py-3.5 mono',
    index: 'mr-[7px] text-faint transition-colors duration-[420ms] group-hover:text-accent',
    pill: 'ml-auto rounded-full border border-ink/20 px-4 py-3.5 mono nav:hidden',
    pillIndex: 'mr-[7px] text-faint',
    clock: 'hidden min-w-[168px] text-right mono text-quiet clock:block',
  },
});

const { root, wordmark, nav, link, index, pill, pillIndex, clock } = siteHeader();

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
        <span className={pillIndex()}>04</span>
        Contact
      </a>

      <p className={clock()}>
        Local time <Clock />
      </p>
    </header>
  );
};
