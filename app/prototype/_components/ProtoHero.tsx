'use client';
import * as React from 'react';
import { tv } from 'tailwind-variants';
import { Reveal } from '@/components/Reveal';
import { usePrefersReducedMotion } from '@/utils/usePrefersReducedMotion';

/** PROTOTYPE — throwaway. Hero whose title rises line by line out of per-line masks. */

const META = [
  { term: 'Who', detail: 'Sam Clark, Creative Developer' },
  { term: 'Currently', detail: 'Contracting at Neverbland' },
  { term: 'Based', detail: 'UK, working remotely' },
  { term: 'Available', detail: 'October 2026' },
];

type Token = { text: string; em?: boolean };

const TITLE: Token[] = [
  { text: 'A' },
  { text: 'creative' },
  { text: 'developer,' },
  { text: 'determined' },
  { text: 'to' },
  { text: 'make' },
  { text: 'the' },
  { text: 'web' },
  { text: 'a' },
  { text: 'more', em: true },
  { text: 'beautiful', em: true },
  { text: 'place.' },
];

const hero = tv({
  slots: {
    root: 'pt-[clamp(72px,10vw,150px)]',
    status: 'flex items-center gap-3 mono text-quiet',
    dot: 'size-[7px] animate-status-pulse rounded-full bg-status',
    title:
      'mt-[clamp(28px,3vw,44px)] max-w-[1120px] text-hero leading-[1.04] font-medium tracking-[-0.028em] text-pretty',
    accent: 'font-serif font-normal tracking-normal italic',
    meta: 'mt-[clamp(48px,7vw,108px)] flex flex-wrap gap-y-7 border-t border-hairline pt-[26px]',
    item: 'flex flex-[1_1_240px] flex-col gap-2.5',
    term: 'mono text-faint',
    detail: 'm-0 text-[clamp(16px,1.2vw,17px)]',
  },
});

const { root, status, dot, title, accent, meta, item, term, detail } = hero();

/** Words sharing a line box share a top, within a tolerance well under one line height. */
const groupIntoLines = (tops: number[]): number[][] => {
  const lines: number[][] = [];
  let top = Number.NEGATIVE_INFINITY;

  tops.forEach((value, i) => {
    if (value - top > 12 || lines.length === 0) {
      lines.push([i]);
      top = value;
      return;
    }
    lines[lines.length - 1]?.push(i);
  });

  return lines;
};

const ProtoTitle = () => {
  const words = React.useRef<(HTMLSpanElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lines, setLines] = React.useState<number[][] | null>(null);
  const [isIn, setIsIn] = React.useState(false);

  // grouping before paint, so the flat measuring pass is never shown
  React.useLayoutEffect(() => {
    if (prefersReducedMotion || lines !== null) return;
    const tops = words.current.map((element) => element?.getBoundingClientRect().top ?? 0);
    setLines(groupIntoLines(tops));
  }, [lines, prefersReducedMotion]);

  React.useEffect(() => {
    if (!lines) return;
    const frame = requestAnimationFrame(() => setIsIn(true));
    return () => cancelAnimationFrame(frame);
  }, [lines]);

  React.useEffect(() => {
    const onResize = () => {
      setIsIn(true);
      setLines(null);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const word = (index: number, ref?: boolean) => {
    const token = TITLE[index];
    if (!token) return null;
    return (
      <span
        key={index}
        ref={ref ? (element) => void (words.current[index] = element) : undefined}
        className={token.em ? accent() : undefined}
      >
        {token.text}
      </span>
    );
  };

  if (!lines) {
    return (
      <h1 className={title()}>
        {TITLE.map((_, i) => (
          <React.Fragment key={i}>{word(i, true)} </React.Fragment>
        ))}
      </h1>
    );
  }

  let delay = 0;

  return (
    <h1 className={title()} data-proto-in={isIn}>
      {lines.map((line, index) => {
        // the serif italic gets its own later beat, so the eye lands on it last
        if (line.some((i) => TITLE[i]?.em)) delay += 90;
        const lineDelay = index * 80 + delay;

        return (
          <span className="proto-line" key={line[0]}>
            <span style={{ '--proto-line-delay': `${lineDelay}ms` } as React.CSSProperties}>
              {line.map((i, position) => (
                <React.Fragment key={i}>
                  {position > 0 ? ' ' : null}
                  {word(i)}
                </React.Fragment>
              ))}
            </span>
          </span>
        );
      })}
    </h1>
  );
};

export const ProtoHero = () => {
  return (
    <section className={root()}>
      <Reveal>
        <p className={status()}>
          <span className={dot()} aria-hidden="true" />
          Available from October 2026
        </p>
      </Reveal>

      <ProtoTitle />

      <Reveal delay={260}>
        <dl className={meta()}>
          {META.map((entry) => (
            <div className={item()} key={entry.term}>
              <dt className={term()}>{entry.term}</dt>
              <dd className={detail()}>{entry.detail}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
};
