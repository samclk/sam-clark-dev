import { tv } from 'tailwind-variants';
import { animationIds } from '@/utils/animationIds';

const preLoader = tv({
  slots: {
    root: 'absolute top-0 left-0 z-50 grid h-svh w-full place-items-center bg-paper',
    label: 'relative block font-space-mono text-sm uppercase',
    bar: 'absolute block h-full w-full bg-red',
    text: 'relative z-10 block opacity-0',
  },
});

const { root, label, bar, text } = preLoader();

export const PreLoader = () => {
  return (
    <div id={animationIds.preLoader} className={root()}>
      <div className={label()}>
        <span id={animationIds.preLoaderBar} style={{ clipPath: 'inset(0 100% 0 0)' }} className={bar()}></span>
        <span id={animationIds.preLoaderText} className={text()}>
          CLK Studio
        </span>
      </div>
    </div>
  );
};
