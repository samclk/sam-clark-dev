import { tv } from 'tailwind-variants';
import { Reveal } from '@/components/Reveal';
import type { HeadingLevel } from '@/types/headingLevel';

/**
 * PROTOTYPE — throwaway. Mosaic whose tiles wipe up in sequence. Hover stays off by design.
 *
 * The wipe sits on an inner element rather than on Reveal itself: a clip-path that hides the
 * observed element also hides it from the IntersectionObserver, so it would never un-clip.
 */

const TILES = [
  { span: 'wide' as const },
  { span: 'narrow' as const },
  { span: 'third' as const },
  { span: 'third' as const },
  { span: 'third' as const },
];

const mosaic = tv({
  slots: {
    root: 'pt-section',
    head: 'flex items-baseline gap-4 pb-[30px]',
    title: 'mono font-normal text-faint',
    note: 'ml-auto mono text-faint',
    grid: 'grid grid-cols-12 gap-3 nav:gap-4',
    cell: '',
    tile: 'size-full overflow-hidden border border-ink/10 bg-tile',
    media: 'block size-full object-cover',
    placeholder: 'flex size-full items-center justify-center mono text-faint',
  },
  variants: {
    span: {
      wide: { cell: 'col-span-full h-60 nav:col-span-7 nav:h-[clamp(240px,32vw,460px)]' },
      narrow: { cell: 'col-span-full h-70 nav:col-span-5 nav:h-[clamp(240px,32vw,460px)]' },
      third: {
        cell: 'col-span-6 h-[165px] last:col-span-full last:h-60 nav:col-span-4 nav:h-[clamp(200px,22vw,320px)] nav:last:col-span-4 nav:last:h-[clamp(200px,22vw,320px)]',
      },
    },
  },
});

const { root, head, title, note, grid, cell, tile, media, placeholder } = mosaic();

export const ProtoMosaic = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
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
          <Reveal className={cell({ span: entry.span })} delay={i * 90} key={i}>
            <div className={tile()}>
              <div className={`${media()} ${placeholder()}`}>
                <span>[IMAGE OR VIDEO]</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
