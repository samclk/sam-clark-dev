import Image from 'next/image';
import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';

/** Order here is the order on the page. Grouped by what the work is, not by vendor. */
const STACK = [
  { area: 'Core', items: ['React', 'Next.js', 'TypeScript'] },
  { area: 'Interface', items: ['Tailwind', 'Design systems', 'Component libraries'] },
  { area: 'Motion & 3D', items: ['GSAP', 'Framer Motion', 'Three.js', 'WebGL'] },
  { area: 'Platforms', items: ['Sanity', 'Shopify', 'Commerce Layer'] },
];

const about = tv({
  slots: {
    root: 'flex flex-col items-start gap-8 pt-section nav:flex-row nav:gap-[clamp(32px,6vw,96px)]',
    block: 'flex w-full shrink-0 flex-col gap-3.5 nav:w-[360px]',
    title: 'mono font-normal text-faint',
    // Duotone: the image screens onto the warm shadow, then paper multiplies over the highlights, so
    // the photograph carries no white of its own. isolate keeps both blends off the page behind it.
    frame:
      "relative isolate aspect-3/2 overflow-hidden bg-duotone after:absolute after:inset-0 after:bg-paper after:mix-blend-multiply after:content-['']",
    image: 'size-full object-cover object-[50%_46%] mix-blend-screen grayscale brightness-[1.06] contrast-[1.18]',
    caption: 'mono text-faint',
    copy: 'flex w-full max-w-[700px] flex-col gap-7 nav:pt-8',
    lede: 'text-lede leading-[1.48] tracking-[-0.012em] text-pretty',
    body: 'leading-[1.62] text-pretty text-quiet',
    stackBlock: 'flex flex-col gap-3.5 pt-3',
    stackTitle: 'mono text-faint',
    stack: 'border-b border-hairline',
    row: 'flex flex-col gap-2 border-t border-hairline py-[18px] nav:flex-row nav:items-baseline nav:gap-8',
    area: 'mono text-faint nav:w-[132px] nav:shrink-0',
    items:
      'dot-between flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 font-mono text-[13px] tracking-[0.01em] text-quiet',
  },
});

const { root, block, title, frame, image, caption, copy, lede, body, stackBlock, stackTitle, stack, row, area, items } =
  about();

export const About = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="about">
      <figure className={block()}>
        <Heading className={title()}>About</Heading>
        <div className={frame()}>
          <Image src="/portrait.webp" alt="Sam Clark" width={900} height={600} className={image()} />
        </div>
        <figcaption className={caption()}>Sam Clark&nbsp;&nbsp;/&nbsp;&nbsp;UK</figcaption>
      </figure>

      <div className={copy()}>
        <p className={lede()}>
          I&rsquo;m Sam. I&rsquo;ve spent about ten years building for the web, and I still like it.
        </p>
        <p className={body()}>
          Most of what I do is platforms and design systems, across SaaS, e-commerce and agency projects. The part I
          actually care about is what happens after launch: whether the component library is pleasant to work in,
          whether a marketing team can ship a new page without asking a developer first.
        </p>
        <p className={body()}>
          The rest of the time I&rsquo;m making things move. If something on a site looks like it took too long to
          build, there&rsquo;s a good chance I enjoyed building it.
        </p>

        <div className={stackBlock()}>
          <p className={stackTitle()}>Stack</p>
          <dl className={stack()}>
            {STACK.map((group) => (
              <div className={row()} key={group.area}>
                <dt className={area()}>{group.area}</dt>
                <dd className={items()}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
