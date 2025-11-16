// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Space_Mono } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CLK Studio | Sam Clark, Senior Full Stack Developer',
  description: 'A dedicated full stack senior developer, determined to make the web a more beautiful place.',
  openGraph: {
    title: 'CLK Studio | Sam Clark, Senior Full Stack Developer',
    description: 'A dedicated full stack senior developer, determined to make the web a more beautiful place.',
    images: ['/me/me.jpg'],
  },
};

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
