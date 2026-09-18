/**
 * Redraws an element's live text into a 2D canvas so a shader can push the pixels around.
 *
 * It measures the real layout rather than re-wrapping: every text node is split into per-line runs
 * with Range rects, so wrapping, alignment and the italic serif span in the headline all come out
 * of the browser's own line breaking and are simply copied.
 */

/** Room around the box for displacement to spill into without clipping. */
export const BLEED = 30;

type Run = {
  text: string;
  font: string;
  letterSpacing: string;
  left: number;
  top: number;
};

const isRendered = (node: Text) => {
  const parent = node.parentElement;
  if (!parent) return false;
  // text put there only for screen readers has no glyphs on the page and must not gain any here
  return !parent.closest('.sr-only');
};

const runsFor = (node: Text, range: Range): Run[] => {
  const parent = node.parentElement;
  if (!parent) return [];
  const style = getComputedStyle(parent);
  const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;

  const runs: Run[] = [];
  let current: Run | null = null;

  for (let i = 0; i < node.data.length; i += 1) {
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // a new line box starts a new run; the 1px slack absorbs sub-pixel rect jitter
    if (!current || Math.abs(rect.top - current.top) > 1) {
      current = { text: '', font, letterSpacing, left: rect.left, top: rect.top };
      runs.push(current);
    }
    current.text += node.data[i];
  }

  return runs;
};

export type TextImage = {
  canvas: HTMLCanvasElement;
  /** CSS pixel size of the drawn area, which is the element box plus BLEED on every side. */
  width: number;
  height: number;
};

export const drawText = (element: HTMLElement, canvas: HTMLCanvasElement): TextImage | null => {
  const box = element.getBoundingClientRect();
  if (box.width === 0 || box.height === 0) return null;

  const width = box.width + BLEED * 2;
  const height = box.height + BLEED * 2;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, width, height);
  // the shader only reads alpha, so the fill colour is arbitrary
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'alphabetic';

  const range = document.createRange();
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node as Text;
    if (!text.data.trim() || !isRendered(text)) continue;

    for (const run of runsFor(text, range)) {
      ctx.font = run.font;
      ctx.letterSpacing = run.letterSpacing;
      // a text node's client rect is the font's content box, so its top plus the ascent is the baseline
      const ascent = ctx.measureText('Hxg').fontBoundingBoxAscent;
      ctx.fillText(run.text, run.left - box.left + BLEED, run.top - box.top + BLEED + ascent);
    }
  }

  return { canvas, width, height };
};
