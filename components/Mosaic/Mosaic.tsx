import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';

/**
 * Every tile is still a placeholder. Swap the div for an <img className="tile-media"> or a muted,
 * looping <video className="tile-media"> and the hover scale and caption come along unchanged.
 */
const TILES = [
  { span: 'wide' as const, caption: '[WHAT THIS IS — PROJECT, YEAR]' },
  { span: 'narrow' as const, caption: '[WHAT THIS IS — PROJECT, YEAR]' },
  { span: 'third' as const, caption: '[WHAT THIS IS — PROJECT, YEAR]' },
  { span: 'third' as const, caption: '[WHAT THIS IS — PROJECT, YEAR]' },
  { span: 'third' as const, caption: '[WHAT THIS IS — PROJECT, YEAR]' },
];

const mosaic = tv({
  slots: {
    root: 'pt-section',
    head: 'flex items-baseline gap-4 pb-[30px]',
    title: 'mono font-normal text-faint',
    note: 'ml-auto mono text-faint',
    grid: 'grid grid-cols-12 gap-3 nav:gap-4',
    tile: 'group relative overflow-hidden border border-ink/10 bg-tile',
    media: 'block size-full object-cover transition-transform duration-[1400ms] ease-brand group-hover:scale-[1.045]',
    placeholder: 'flex size-full items-center justify-center mono text-faint',
    scrim:
      'pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-[520ms] group-hover:opacity-100',
    caption:
      'absolute inset-x-[18px] bottom-4 translate-y-2.5 mono text-paper opacity-0 transition duration-[480ms] ease-brand group-hover:translate-y-0 group-hover:opacity-100',
  },
  variants: {
    span: {
      wide: { tile: 'col-span-full h-60 nav:col-span-7 nav:h-[clamp(240px,32vw,460px)]' },
      narrow: { tile: 'col-span-full h-70 nav:col-span-5 nav:h-[clamp(240px,32vw,460px)]' },
      third: {
        tile: 'col-span-6 h-[165px] last:col-span-full last:h-60 nav:col-span-4 nav:h-[clamp(200px,22vw,320px)] nav:last:col-span-4 nav:last:h-[clamp(200px,22vw,320px)]',
      },
    },
  },
});

const { root, head, title, note, grid, tile, media, placeholder, scrim, caption } = mosaic();

export const Mosaic = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="highlights">
      <div className={head()}>
        <Heading className={title()}>Highlights</Heading>
        <p className={note()}>Details, motion and interface work</p>
      </div>

      <div className={grid()}>
        {TILES.map((entry, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <figure className={tile({ span: entry.span })} key={i}>
            <div className={`${media()} ${placeholder()}`}>
              <span>[IMAGE OR VIDEO]</span>
            </div>
            <div className={scrim()} aria-hidden="true" />
            <figcaption className={caption()}>{entry.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
