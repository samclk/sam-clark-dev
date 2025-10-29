import { JobMarquee } from './components/JobMarquee';
import { Clock } from './components/Clock';

export const TopBar = () => {
  return (
    <div
      id="top-bar"
      className="font-space-mono fixed top-0 left-0 z-50 w-full -translate-y-full border-b px-1.5 py-1.5 text-[12px] text-white/80 uppercase"
    >
      <div id="top-bar-content" className="grid grid-cols-[auto_1fr] gap-x-2 opacity-0 lg:grid-cols-[1fr_auto_1fr]">
        <div className="hidden lg:block">CLK DEVELOPMENT</div>
        <div className="flex items-center gap-x-2 text-center">
          <div className="after:bg-green h-1.5 w-1.5 after:block after:h-full after:w-full after:animate-pulse after:rounded-full after:content-['']"></div>
          <JobMarquee />
        </div>
        <div className="text-right">
          <Clock />
        </div>
      </div>
    </div>
  );
};
