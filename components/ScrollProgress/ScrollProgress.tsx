import { tv } from 'tailwind-variants';

/** Above the header and the sliding panel both, so nothing the page scrolls ever covers it. */
const scrollProgress = tv({
  slots: { root: 'fixed inset-x-0 top-0 z-60 h-px scroll-progress bg-accent' },
});

const { root } = scrollProgress();

export const ScrollProgress = () => <div className={root()} aria-hidden="true" />;
