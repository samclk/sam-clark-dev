import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';

const WORKS = [
  {
    index: '01',
    name: 'Backstage with Bon Jovi',
    tag: 'Awwwards SOTD',
    role: 'Lead Developer',
    built: 'Three.js · WebGL',
  },
  { index: '02', name: 'Natoora', role: 'Lead Developer', built: 'Sanity · Commerce Layer' },
  { index: '03', name: 'Neverbland Studio', role: 'Sole Developer', built: 'Design system · Page builder' },
  {
    index: '04',
    name: 'RSPCA Assured',
    role: 'Sole Developer',
    built: 'Design · Component library · Sanity CMS',
  },
];

const workList = tv({
  slots: {
    root: 'pt-section',
    head: 'flex items-baseline gap-4 pb-[30px]',
    title: 'mono font-normal text-faint',
    note: 'ml-auto mono text-faint',
    row: 'group relative flex flex-wrap items-center gap-4 border-t border-hairline px-1.5 py-[clamp(22px,2.6vw,36px)] last:border-b nav:flex-nowrap nav:gap-[clamp(16px,2vw,32px)]',
    rule: 'absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-[760ms] ease-brand group-hover:scale-x-100',
    index:
      'w-[34px] mono text-faint transition duration-[420ms] ease-brand group-hover:-translate-y-[3px] group-hover:text-accent',
    name: 'text-work leading-tight font-medium tracking-[-0.02em] transition-transform duration-[640ms] ease-brand nav:group-hover:translate-x-[18px]',
    right:
      'flex w-full min-w-0 flex-wrap items-center gap-x-[18px] gap-y-2 pl-[50px] nav:ml-auto nav:w-auto nav:flex-nowrap nav:pl-0',
    tag: 'rounded-full border border-ink/20 px-3 py-[7px] mono whitespace-nowrap text-quiet',
    meta: 'min-w-0 mono text-quiet transition-opacity duration-[420ms] group-hover:opacity-45',
    separator: 'mx-2 text-faint',
    arrow:
      'hidden w-[22px] -translate-x-3.5 opacity-0 transition duration-[640ms] ease-brand group-hover:translate-x-0 group-hover:opacity-100 nav:flex',
  },
});

const { root, head, title, note, row, rule, index, name, right, tag, meta, separator, arrow } = workList();

export const WorkList = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="work">
      <div className={head()}>
        <Heading className={title()}>Works</Heading>
        <p className={note()}>Four selected</p>
      </div>

      <ul>
        {WORKS.map((work) => (
          <li key={work.index}>
            {/* href stays # until the case study pages exist */}
            <a className={row()} href="#">
              <span className={rule()} aria-hidden="true" />
              <span className={index()}>{work.index}</span>
              <span className={name()}>{work.name}</span>
              <span className={right()}>
                {work.tag ? <span className={tag()}>{work.tag}</span> : null}
                <span className={meta()}>
                  {work.role}
                  <span className={separator()}>/</span>
                  {work.built}
                </span>
              </span>
              <span className={arrow()} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 16 L16 6" />
                  <path d="M8 6 h8 v8" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
