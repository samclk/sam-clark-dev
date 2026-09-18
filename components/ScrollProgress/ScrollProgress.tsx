import { tv } from 'tailwind-variants';

/**
 * Paints after the header so the blend never reaches it: mix-blend-difference takes its backdrop
 * from what is painted below it, and a lower rule would be inverted along with the page.
 */
const scrollProgress = tv({
  slots: { root: 'fixed inset-x-0 top-0 z-60 h-px scroll-progress bg-accent' },
});

const { root } = scrollProgress();

export const ScrollProgress = () => <div className={root()} aria-hidden="true" />;
