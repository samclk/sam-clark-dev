import { tv } from 'tailwind-variants';
import { Reveal } from '@/components/Reveal';
import { WetInk } from '@/components/WetInk';

const META = [
  { term: 'Who', detail: 'Sam Clark, Creative Developer' },
  { term: 'Currently', detail: 'Contracting at Neverbland' },
  { term: 'Based', detail: 'UK, working remotely' },
  { term: 'Available', detail: 'October 2026' },
];

const hero = tv({
  slots: {
    root: 'pt-[clamp(72px,10vw,150px)] tall:sticky tall:top-0',
    status: 'flex items-center gap-3 mono text-quiet',
    dot: 'size-[7px] animate-status-pulse rounded-full bg-status',
    title:
      'mt-[clamp(28px,3vw,44px)] max-w-[1120px] text-hero leading-[1.04] font-medium tracking-[-0.028em] text-balance nav:text-pretty',
    accent: 'font-serif font-normal tracking-normal italic',
    meta: 'mt-[clamp(48px,7vw,108px)] flex flex-wrap gap-y-7 border-t border-hairline pt-[26px]',
    item: 'flex flex-[1_1_240px] flex-col gap-2.5',
    term: 'mono text-faint',
    detail: 'm-0 text-[clamp(16px,1.2vw,17px)]',
  },
});

const { root, status, dot, title, accent, meta, item, term, detail } = hero();

export const Hero = () => {
  return (
    <section className={root()}>
      <Reveal>
        <p className={status()}>
          <span className={dot()} aria-hidden="true" />
          Available from October 2026
        </p>
      </Reveal>

      <Reveal delay={120}>
        <WetInk target="h1" settle>
          <h1 className={title()}>
            A creative developer, determined to make the web a <em className={accent()}>more beautiful</em> place.
          </h1>
        </WetInk>
      </Reveal>

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
