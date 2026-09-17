import './proto.css';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

/** PROTOTYPE — throwaway. Never reachable from a production build. */
export default function PrototypeLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === 'production') notFound();
  return children;
}
