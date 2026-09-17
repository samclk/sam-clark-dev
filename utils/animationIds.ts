/**
 * PageWrapper's entrance timeline drives elements that other components render, so these ids are a
 * contract between them. Referencing them from here makes a rename a type error rather than an
 * animation that silently stops running.
 */
export const animationIds = {
  preLoader: 'pre-loader',
  preLoaderBar: 'pre-loader-bar',
  preLoaderText: 'pre-loader-text',
  topBar: 'top-bar',
  topBarContent: 'top-bar-content',
  overlayContainer: 'overlay-container',
  overlayContent: 'overlay-content',
  coords: 'coords',
  noise: 'noise',
} as const;
