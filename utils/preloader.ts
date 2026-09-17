const PRELOADER_COMPLETE = 'preloader-complete';

let complete = false;

export const markPreloaderComplete = (): void => {
  complete = true;
  window.dispatchEvent(new CustomEvent(PRELOADER_COMPLETE));
};

/** The WebGL scene loads lazily, so it can mount after the preloader has already finished. */
export const onPreloaderComplete = (run: () => void): (() => void) => {
  if (complete) {
    run();
    return () => {};
  }

  window.addEventListener(PRELOADER_COMPLETE, run);
  return () => window.removeEventListener(PRELOADER_COMPLETE, run);
};
