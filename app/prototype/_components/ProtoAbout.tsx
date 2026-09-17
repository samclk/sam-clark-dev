/** PROTOTYPE — throwaway. About revealed in two beats, image then copy. */

import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { Reveal } from '@/components/Reveal';
import type { HeadingLevel } from '@/types/headingLevel';

const about = tv({
  slots: {
    root: 'flex flex-col items-start gap-8 pt-section nav:flex-row nav:gap-[clamp(32px,6vw,96px)]',
    block: 'flex flex-col gap-3.5',
    blockOuter: 'w-full shrink-0 nav:w-[360px]',
    title: 'mono font-normal text-faint',
    frame: 'group aspect-4/5 overflow-hidden border border-hairline bg-[#2a2a26]',
    // the crop needs this offset to keep the face in frame
    image:
      'size-full object-cover object-[50%_32%] transition-transform duration-[1400ms] ease-brand group-hover:scale-[1.035]',
    caption: 'mono text-faint',
    copy: 'flex max-w-[700px] flex-col gap-7 nav:pt-8',
    lede: 'text-lede leading-[1.48] tracking-[-0.012em] text-pretty',
    body: 'leading-[1.62] text-pretty text-quiet',
  },
});

const { root, block, blockOuter, title, frame, image, caption, copy, lede, body } = about();

export const ProtoAbout = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="about">
      <Reveal className={blockOuter()}>
        <figure className={block()}>
          <Heading className={title()}>About</Heading>
          <div className={frame()}>
            <Image src="/portrait.webp" alt="Sam Clark" width={900} height={600} className={image()} />
          </div>
          <figcaption className={caption()}>Sam Clark&nbsp;&nbsp;/&nbsp;&nbsp;UK</figcaption>
        </figure>
      </Reveal>

      <Reveal className="w-full" delay={160}>
        <div className={copy()}>
          <p className={lede()}>
            Ten years building web platforms, design systems and high-performance digital products — across SaaS,
            e-commerce and agency work.
          </p>
          <p className={body()}>
            I live in the layer where engineering meets craft: motion in Framer Motion and GSAP, interactive work in
            Three.js and WebGL, and React, Next.js and TypeScript underneath it. Most of what I build is meant to be
            handed over — component libraries, page builders and CMS architectures that let content and marketing teams
            move on their own without the detail falling apart.
          </p>
        </div>
      </Reveal>
    </section>
  );
};
