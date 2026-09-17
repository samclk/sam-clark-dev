import { tv } from 'tailwind-variants';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Mosaic } from '@/components/Mosaic';
import { WorkList } from '@/components/WorkList';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { SiteFooter } from '@/components/SiteFooter';

const home = tv({ slots: { main: 'mx-auto max-w-[1440px] px-gutter' } });

const { main } = home();

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={main()} id="top">
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
