// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Space_Mono } from 'next/font/google';

export const metadata = {
  title: 'CLK Development | Sam Clark, Senior Full Stack Developer',
  description: 'A dedicated full stack senior developer, determined to make the web a more beautiful place.',
};

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
