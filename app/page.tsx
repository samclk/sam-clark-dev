import { tv } from 'tailwind-variants';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Mosaic } from '@/components/Mosaic';
import { WorkList } from '@/components/WorkList';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { SiteFooter } from '@/components/SiteFooter';

/* WetInk draws its canvas BLEED px outside the text on every side, and an absolutely positioned
   box still counts towards scrollable overflow. Past the gutter that is a horizontal scrollbar. */
const home = tv({ slots: { main: 'mx-auto max-w-[1440px] overflow-x-clip px-gutter' } });

const { main } = home();

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={main()}>
        <Hero />
        <Mosaic />
        <WorkList />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
