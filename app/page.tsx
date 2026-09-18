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
const home = tv({
  slots: {
    main: 'mx-auto max-w-[1440px] overflow-x-clip px-gutter',
    // Nav and headline pin as one element, so neither can move against the other and no constant
    // has to track the nav's height. focus-within lifts it clear of the panel that covers it.
    sheet: 'sticky top-0 z-0 focus-within:z-50',
    // Rides over the pinned hero, so it needs its own ground and a layer above one that is
    // positioned. Everything below the hero travels together, so one wrapper covers it.
    over: 'relative z-10 bg-paper',
  },
});

const { main, sheet, over } = home();

export default function Home() {
  return (
    <>
      <main className={main()}>
        <div className={sheet()}>
          <SiteHeader />
          <Hero />
        </div>

        <div className={over()}>
          <Hero.Meta />
          <Mosaic />
          <WorkList />
          <About />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
