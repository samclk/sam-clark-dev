import './globals.css';
import type { ReactNode } from 'react';
import { Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SITE_URL } from '@/utils/siteUrl';
import { SOCIALS } from '@/utils/socials';

const TITLE = 'CLK Studio — Sam Clark, Creative Developer';
const DESCRIPTION =
  'Sam Clark, creative developer. Ten years building web platforms, design systems and high-performance digital products.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    siteName: 'CLK Studio',
    title: TITLE,
    description: DESCRIPTION,
    // kept as jpeg because several social scrapers still refuse webp
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Sam Clark, creative developer' }],
  },
};

/** Ties the name, the domain and the linked profiles together as one entity for search engines. */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Sam Clark',
      jobTitle: 'Creative Developer',
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/portrait.webp`,
      address: { '@type': 'PostalAddress', addressCountry: 'GB' },
      sameAs: SOCIALS.map((social) => social.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'CLK Studio',
      inLanguage: 'en-GB',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
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
    <html lang="en-GB" className={`${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`}>
      {/* the anchor for #top: main starts below the header, so it lands past it */}
      <body id="top">
        {children}
        <ScrollProgress />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      </body>
    </html>
  );
}
