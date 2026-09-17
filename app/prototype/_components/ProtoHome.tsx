import { tv } from 'tailwind-variants';
import { SiteHeader } from '@/components/SiteHeader';
import { Hero } from '@/components/Hero';
import { Mosaic } from '@/components/Mosaic';
import { WorkList } from '@/components/WorkList';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { SiteFooter } from '@/components/SiteFooter';
import type { Idea, Part } from '../ideas';
import { ProtoSiteHeader } from './ProtoSiteHeader';
import { ProtoHero } from './ProtoHero';
import { ProtoMosaic } from './ProtoMosaic';
import { ProtoWorkList } from './ProtoWorkList';
import { ProtoAbout } from './ProtoAbout';
import { ProtoContact } from './ProtoContact';
import { ScrollRule } from './ScrollRule';

/** PROTOTYPE — throwaway. The real homepage with exactly one idea layered over it. */

const home = tv({ slots: { main: 'mx-auto max-w-[1440px] px-gutter' } });

const { main } = home();

export const ProtoHome = ({ idea }: { idea: Idea }) => {
  const has = (part: Part) => idea.parts.includes(part);

  return (
    <div data-proto={idea.effects.join(' ')}>
      {has('scrollRule') ? <ScrollRule /> : null}
      {has('header') ? <ProtoSiteHeader /> : <SiteHeader />}

      <main className={main()} id="top">
        {has('hero') ? <ProtoHero /> : <Hero />}
        {has('mosaic') ? <ProtoMosaic /> : <Mosaic />}
        {has('work') ? <ProtoWorkList /> : <WorkList />}
        {has('about') ? <ProtoAbout /> : <About />}
        {has('contact') ? <ProtoContact /> : <Contact />}
      </main>

      <SiteFooter />
    </div>
  );
};
