import { tv } from 'tailwind-variants';
import { animationIds } from '@/utils/animationIds';
import { JobMarquee } from './components/JobMarquee';
import { Clock } from './components/Clock';

const topBar = tv({
  slots: {
    root: 'fixed top-0 left-0 z-50 w-full -translate-y-full border-b px-1.5 py-1.5 font-space-mono text-[12px] text-white uppercase drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.8)]',
    content: 'grid grid-cols-[auto_1fr] gap-x-2 opacity-0 lg:grid-cols-[1fr_auto_1fr]',
    studio: 'hidden lg:block',
    status: 'flex items-center gap-x-2 text-center',
    pulse:
      "h-1.5 w-1.5 after:block after:h-full after:w-full after:animate-pulse after:rounded-full after:bg-green after:content-[''] motion-reduce:after:animate-none",
    time: 'text-right',
  },
});

const { root, content, studio, status, pulse, time } = topBar();

export const TopBar = () => {
  return (
    <header id={animationIds.topBar} className={root()}>
      <div id={animationIds.topBarContent} className={content()}>
        <div className={studio()}>CLK Studio</div>
        <div className={status()}>
          <div className={pulse()} aria-hidden="true"></div>
          <JobMarquee />
        </div>
        <div className={time()}>
          <Clock />
        </div>
      </div>
    </header>
  );
};
