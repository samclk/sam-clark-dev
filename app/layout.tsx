import './globals.css';
import { ReactNode } from 'react';
import { Space_Mono, Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import { animationIds } from '@/utils/animationIds';

const TITLE = 'CLK Studio | Sam Clark, Senior Full Stack Developer';
const DESCRIPTION = 'A dedicated full stack senior developer, determined to make the web a more beautiful place.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.clkstudio.co.uk'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    // kept as jpeg because several social scrapers still refuse webp
    images: ['/me/og.jpg'],
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

// the entrance timeline is what reveals the page, so without it every element stays in its start state
const noScriptStyles = `
  #${animationIds.preLoader} { display: none !important; }
  #${animationIds.topBar} { transform: none !important; }
  #${animationIds.topBarContent}, #${animationIds.overlayContent}, #${animationIds.coords} { opacity: 1 !important; }
  #${animationIds.overlayContainer} { clip-path: none !important; }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${montserrat.variable}`}>
      <body>
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
