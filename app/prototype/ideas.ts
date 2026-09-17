/**
 * PROTOTYPE — throwaway. Eleven subtle-motion ideas, one per route, each layered over the real
 * homepage so they are judged in context rather than in a vacuum. Delete with the branch.
 *
 * Two mechanisms. `effects` are tokens written onto `data-proto` and picked up by proto.css, for
 * anything achievable without touching markup. `parts` swap a real component for a forked one,
 * for the ideas that need different markup.
 */

export type Part = 'header' | 'hero' | 'mosaic' | 'work' | 'about' | 'contact' | 'scrollRule';

export type Idea = {
  slug: string;
  name: string;
  blurb: string;
  cost: 'CSS only' | 'Reveal' | 'New code';
  effects: readonly string[];
  parts: readonly Part[];
};

const IDEAS_BASE = [
  {
    slug: 'sibling-dim',
    name: 'Work list sibling dim',
    blurb: 'Hovering a row fades the rest back. Pure CSS, and it fires on keyboard focus too.',
    cost: 'CSS only',
    effects: ['sibling-dim'],
    parts: [],
  },
  {
    slug: 'scroll-rule',
    name: 'Scroll progress hairline',
    blurb: 'A 1px accent line across the top, filled by scroll position. No JS, no observer.',
    cost: 'CSS only',
    effects: ['scroll-rule'],
    parts: ['scrollRule'],
  },
  {
    slug: 'portrait-parallax',
    name: 'Portrait parallax',
    blurb: 'The About image drifts a few percent as the section passes. Composes with the hover scale.',
    cost: 'CSS only',
    effects: ['portrait-parallax'],
    parts: [],
  },
  {
    slug: 'section-rules',
    name: 'Section rules draw in',
    blurb: 'A hairline above each section heading, scaling in from the left as the section arrives.',
    cost: 'CSS only',
    effects: ['section-rules'],
    parts: [],
  },
  {
    slug: 'quiet-dot',
    name: 'Quieter status dot',
    blurb: 'A subtraction. The expanding ring becomes a slow opacity breathe on the dot itself.',
    cost: 'CSS only',
    effects: ['quiet-dot'],
    parts: [],
  },
  {
    slug: 'mosaic-stagger',
    name: 'Mosaic tile stagger',
    blurb: 'Five tiles, 90ms apart, wiping up under a clip-path rather than sliding.',
    cost: 'Reveal',
    effects: ['mosaic-stagger'],
    parts: ['mosaic'],
  },
  {
    slug: 'work-stagger',
    name: 'Work row stagger',
    blurb: 'Six rows, 70ms apart, so the list arrives in sequence instead of all at once.',
    cost: 'Reveal',
    effects: [],
    parts: ['work'],
  },
  {
    slug: 'reveal-sections',
    name: 'Reveal About and Contact',
    blurb: 'Copy after image, socials after the email. The component already exists and is unused below the hero.',
    cost: 'Reveal',
    effects: [],
    parts: ['about', 'contact'],
  },
  {
    slug: 'hero-lines',
    name: 'Hero title by line',
    blurb: 'Measured line split, each line rising out of its own mask 80ms apart. The serif italic takes a later beat.',
    cost: 'New code',
    effects: ['hero-lines'],
    parts: ['hero'],
  },
  {
    slug: 'nav-active',
    name: 'Active section in nav',
    blurb:
      'The index of whichever section crosses the middle goes accent. Only pays off with a sticky header, so this route makes it stick.',
    cost: 'New code',
    effects: ['nav-active'],
    parts: ['header'],
  },
] as const satisfies readonly Idea[];

const EVERYTHING: Idea = {
  slug: 'everything',
  name: 'Everything at once',
  blurb: 'All ten layered together. The test of whether restraint survives addition.',
  cost: 'New code',
  effects: IDEAS_BASE.flatMap((idea) => idea.effects),
  parts: [...new Set(IDEAS_BASE.flatMap((idea) => idea.parts))] as Part[],
};

export const IDEAS: readonly Idea[] = [...IDEAS_BASE, EVERYTHING];

export const findIdea = (slug: string) => IDEAS.find((idea) => idea.slug === slug);
