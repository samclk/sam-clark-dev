import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';
import { TileVideo } from './TileVideo';

/**
 * A showcase, not a gallery: the tiles do not respond to the pointer and lead nowhere. Each clip is
 * cut to its own slot's aspect ratio, so object-cover has almost nothing left to crop away. Stacked
 * tiles carry that ratio as aspect-*; the row heights only take over once the grid goes side by side.
 */
const TILES = [
  { id: 'bon-jovi', span: 'wide' as const },
  { id: 'walmart', span: 'narrow' as const },
  { id: 'gsk', span: 'third' as const },
  { id: 'fussy', span: 'third' as const },
  { id: 'snowball', span: 'third' as const },
];

const mosaic = tv({
  slots: {
    root: 'pt-section',
    head: 'flex items-baseline gap-4 pb-[30px]',
    title: 'mono font-normal text-faint',
    note: 'ml-auto mono text-faint',
    grid: 'grid grid-cols-12 gap-3 nav:gap-4',
    tile: 'overflow-hidden rounded-md bg-tile',
    // Safari does not reliably clip a video to a rounded ancestor, so round the element itself too.
    media: 'block size-full rounded-md object-cover',
  },
  variants: {
    span: {
      wide: {
        tile: 'col-span-full aspect-[1440/900] nav:col-span-7 nav:aspect-auto nav:h-[clamp(240px,32vw,460px)]',
      },
      narrow: {
        tile: 'col-span-full aspect-[1044/920] nav:col-span-5 nav:aspect-auto nav:h-[clamp(240px,32vw,460px)]',
      },
      third: {
        tile: 'col-span-6 aspect-[828/634] last:col-span-full nav:col-span-4 nav:aspect-auto nav:h-[clamp(200px,22vw,320px)] nav:last:col-span-4',
      },
    },
  },
});

const { root, head, title, note, grid, tile, media } = mosaic();

export const Mosaic = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="highlights">
      <div className={head()}>
        <Heading className={title()}>Highlights</Heading>
        <p className={note()}>Details, motion and interface work</p>
      </div>

      <div className={grid()}>
        {TILES.map((entry) => (
          <div className={tile({ span: entry.span })} key={entry.id}>
            <TileVideo className={media()} poster={`/mosaic/${entry.id}.webp`} src={`/mosaic/${entry.id}.mp4`} />
          </div>
        ))}
      </div>
    </section>
  );
};
