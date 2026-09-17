'use client';

import dynamic from 'next/dynamic';

// three, fiber and drei are ~180 kB that cannot paint until the preloader clears, so they stay out
// of the first load and there is no server pass to render a WebGL canvas on.
const MaskScene = dynamic(() => import('./MaskScene').then((m) => m.MaskScene), { ssr: false });

export const MaskEffect = () => <MaskScene />;
