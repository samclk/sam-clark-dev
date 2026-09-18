import { tv } from 'tailwind-variants';
import { Clock } from '@/components/Clock';
import { HeaderLayer } from '@/components/HeaderLayer';

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
 * collides with whatever it sits on.
 *
 * Over the hero it sits in the hero's own layer and lets the sliding panel pass over it, so the
 * panel's rule arrives as one edge rather than racing a header down the same line. Keyboard focus
 * lifts it clear of both, since a focused link under the panel would take focus somewhere invisible.
 */
const siteHeader = tv({
  slots: {
    root: 'sticky top-0 mx-auto flex max-w-[1440px] items-center gap-10 px-gutter pt-10 pb-4 text-white mix-blend-difference transition-transform duration-[420ms] ease-brand focus-within:z-50 focus-within:translate-y-0',
    wordmark: 'ln mono font-medium tracking-[0.14em]',
    nav: 'ml-auto hidden gap-[30px] nav:flex',
    link: 'group ln py-3.5 mono',
    index: 'mr-[7px] text-white/55 transition-colors duration-[420ms] group-hover:text-white',
    // A standing call to action, not a position indicator: it carries no index because it never
    // tracks the section you are in.
    pill: 'ml-auto rounded-full border border-white/35 px-4 py-3.5 mono nav:hidden',
    clock: 'hidden min-w-[168px] text-right mono text-white/70 clock:block',
  },
  variants: {
    mode: {
      attached: { root: 'z-0 translate-y-0' },
      shown: { root: 'z-50 translate-y-0' },
      hidden: { root: 'z-50 -translate-y-full' },
    },
  },
});

const { wordmark, nav, link, index, pill, clock } = siteHeader();

// resolved here so tailwind-variants stays out of the client bundle; only the strings cross over
const CLASS_NAMES = {
  attached: siteHeader({ mode: 'attached' }).root(),
  shown: siteHeader({ mode: 'shown' }).root(),
  hidden: siteHeader({ mode: 'hidden' }).root(),
};

export const SiteHeader = () => {
  return (
    <HeaderLayer classNames={CLASS_NAMES} edge="[data-panel-edge]">
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
    </HeaderLayer>
  );
};
