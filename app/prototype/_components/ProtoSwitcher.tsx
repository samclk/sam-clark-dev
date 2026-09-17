'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { IDEAS } from '../ideas';

/** PROTOTYPE — throwaway. Floating bar: arrows cycle routes, left/right keys do the same. */
export const ProtoSwitcher = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const at = IDEAS.findIndex((idea) => idea.slug === slug);
  const current = IDEAS[at];

  const go = React.useCallback(
    (step: number) => {
      const next = IDEAS[(at + step + IDEAS.length) % IDEAS.length];
      if (next) router.push(`/prototype/${next.slug}`);
    },
    [at, router],
  );

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable]')) return;
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'ArrowRight') go(1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [go]);

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-5 z-100 flex justify-center px-4 print:hidden">
      <div className="flex max-w-full items-stretch gap-1 rounded-full bg-ink p-1 text-paper shadow-[0_10px_40px_rgb(20_20_15/0.35)]">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous idea"
          className="rounded-full px-3.5 py-2 text-[13px] hover:bg-paper/15"
        >
          ←
        </button>

        <a
          href="/prototype"
          className="flex min-w-0 flex-col justify-center rounded-full px-3 text-center hover:bg-paper/15"
        >
          <span className="truncate mono text-paper/55">
            {at + 1} / {IDEAS.length} · {current.cost}
          </span>
          <span className="truncate text-[13px] leading-tight">{current.name}</span>
        </a>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next idea"
          className="rounded-full px-3.5 py-2 text-[13px] hover:bg-paper/15"
        >
          →
        </button>
      </div>
    </div>
  );
};
