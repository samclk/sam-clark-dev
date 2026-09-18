/**
 * Redraws an element's live text into a 2D canvas so a shader can push the pixels around.
 *
 * It measures the real layout rather than re-wrapping: every text node is split into per-line runs
 * with Range rects, so wrapping, alignment and the italic serif span in the headline all come out
 * of the browser's own line breaking and are simply copied.
 *
 * Because the real text is hidden once this succeeds, every way of drawing nothing has to be
 * caught here rather than discovered by a reader looking at a blank page. It returns null instead
 * of a canvas whenever the copy would not match the text it is covering, and the caller then leaves
 * the element alone.
 *
 * It copies one code unit at a time, so it is correct for the Latin text on this site and would
 * split an emoji or a combining mark. Use it on prose, not on arbitrary user content.
 */

import { renderScale } from './gl';

/** Room around the box, in CSS pixels, for displacement to spill into without clipping. */
export const BLEED = 30;

type Run = {
  text: string;
  font: string;
  fontSize: number;
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

const runsFor = (node: Text, range: Range): Run[] | null => {
  const parent = node.parentElement;
  if (!parent) return null;
  const style = getComputedStyle(parent);

  // the rects below are of the transformed text while node.data is the source, so they disagree
  if (style.textTransform !== 'none') return null;

  const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
  const fontSize = parseFloat(style.fontSize) || 16;

  const runs: Run[] = [];
  let current: Run | null = null;

  for (let i = 0; i < node.data.length; i += 1) {
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;

    // a new line box starts a new run; the 1px slack absorbs sub-pixel rect jitter
    if (!current || Math.abs(rect.top - current.top) > 1) {
      current = { text: '', font, fontSize, letterSpacing, left: rect.left, top: rect.top };
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
  const scale = renderScale();

  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  // unsupported before Safari 17.4 and Firefox 132, where the assignment is silently ignored; the
  // headline's -0.028em would then draw a run far wider than the text it covers
  const canSpace = 'letterSpacing' in ctx;

  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, width, height);
  // the shader only reads alpha, so the fill colour is arbitrary
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'alphabetic';

  const range = document.createRange();
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let drawn = 0;

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node as Text;
    if (!text.data.trim() || !isRendered(text)) continue;

    const runs = runsFor(text, range);
    if (!runs) return null;

    for (const run of runs) {
      if (!canSpace && run.letterSpacing !== '0px') return null;
      ctx.font = run.font;
      if (canSpace) ctx.letterSpacing = run.letterSpacing;

      // a text node's client rect is the font's content box, so its top plus the ascent is the
      // baseline. fontBoundingBoxAscent is a font-level metric, so the string measured is arbitrary.
      const metrics = ctx.measureText('Hxg');
      const ascent = metrics.fontBoundingBoxAscent ?? metrics.actualBoundingBoxAscent ?? run.fontSize * 0.8;
      if (!Number.isFinite(ascent)) return null;

      ctx.fillText(run.text, run.left - box.left + BLEED, run.top - box.top + BLEED + ascent);
      drawn += 1;
    }
  }

  // nothing was copied, so hiding the real text would leave the reader with a blank space
  if (drawn === 0) return null;

  return { canvas, width, height };
};
