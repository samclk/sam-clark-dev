import Link from 'next/link';
import { IDEAS } from './ideas';

/** PROTOTYPE — throwaway. Index of the motion ideas, one route each. */

export default function PrototypeIndex() {
  return (
    <main className="mx-auto max-w-[900px] px-gutter py-24">
      <p className="mono text-faint">Prototype · subtle motion</p>
      <h1 className="mt-4 text-work font-medium tracking-[-0.02em]">Eleven ideas, one route each</h1>
      <p className="mt-4 max-w-[60ch] text-quiet">
        Each route is the real homepage with a single idea layered over it. Cycle with the bar at the bottom, or the
        left and right arrow keys.
      </p>

      <ul className="mt-14">
        {IDEAS.map((idea) => (
          <li key={idea.slug}>
            <Link
              href={`/prototype/${idea.slug}`}
              className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-hairline py-6 last:border-b"
            >
              <span className="w-[86px] shrink-0 mono text-faint transition-colors group-hover:text-accent">
                {idea.cost}
              </span>
              <span className="text-lede font-medium tracking-[-0.015em]">{idea.name}</span>
              <span className="w-full max-w-[52ch] text-quiet">{idea.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
