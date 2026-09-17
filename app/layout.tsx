import './globals.css';
import type { ReactNode } from 'react';
import { Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

const TITLE = 'CLK Studio — Sam Clark, Creative Developer';
const DESCRIPTION =
  'Sam Clark, creative developer. Ten years building web platforms, design systems and high-performance digital products.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.clkstudio.co.uk'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    // kept as jpeg because several social scrapers still refuse webp
    images: ['/og.jpg'],
  },
};

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-schibsted',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
