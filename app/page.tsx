import { tv } from 'tailwind-variants';
import { MaskEffect } from '@/components/MaskEffect';
import { Overlay } from '@/components/Overlay';
import { PageWrapper } from '@/components/PageWrapper';
import { TopBar } from '@/components/TopBar';
import { PreLoader } from '@/components/PreLoader';

const home = tv({ slots: { overlaySlot: 'relative z-10 grid h-full place-items-center px-4 lg:w-2/3' } });

const { overlaySlot } = home();

export default function Home() {
  return (
    <PageWrapper>
      <TopBar />
      <MaskEffect />
      <main className={overlaySlot()}>
        <Overlay headingLevel={2} />
      </main>
      <PreLoader />
    </PageWrapper>
  );
}
