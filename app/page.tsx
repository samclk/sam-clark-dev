import { MaskEffect } from '../components/MaskEffect';
import { Overlay } from '../components/Overlay';
import { PageWrapper } from '../components/PageWrapper';
import { TopBar } from '../components/TopBar';

export default function Home() {
  return (
    <PageWrapper>
      <TopBar />
      <MaskEffect />
      <div className="relative z-10 grid h-full place-items-center px-4 lg:w-2/3">
        <Overlay />
      </div>
    </PageWrapper>
  );
}
