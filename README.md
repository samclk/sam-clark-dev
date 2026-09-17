# CLK Studio

Personal site for Sam Clark. [Next.js](https://nextjs.org/) App Router, Tailwind v4, GSAP, and a
`react-three-fiber` WebGL scene.

## Getting started

Requires Node >= 20.9 and [pnpm](https://pnpm.io/) 11. With corepack: `corepack enable`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The page lives in `app/page.tsx`; components are in `components/`.

## Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

## Deploying

Deployed on [Vercel](https://vercel.com). The `packageManager` field pins pnpm, so Vercel picks the
right installer from the lockfile without extra config.
