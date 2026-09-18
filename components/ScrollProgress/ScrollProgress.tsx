import { tv } from 'tailwind-variants';

/**
 * Above the header and the sliding panel both, so nothing the page scrolls ever covers it. Desktop
 * only: on a phone it lands in the same strip as the browser's own chrome and gets in the way.
 */
const scrollProgress = tv({
  slots: { root: 'fixed inset-x-0 top-0 z-60 hidden h-px scroll-progress bg-accent nav:block' },
});

const { root } = scrollProgress();

export const ScrollProgress = () => <div className={root()} aria-hidden="true" />;
