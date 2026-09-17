import { notFound } from 'next/navigation';
import { IDEAS, findIdea } from '../ideas';
import { ProtoHome } from '../_components/ProtoHome';
import { ProtoSwitcher } from '../_components/ProtoSwitcher';

/** PROTOTYPE — throwaway. One route per idea, so each is judged against the real page. */

export const generateStaticParams = () => IDEAS.map((idea) => ({ idea: idea.slug }));

export default async function PrototypePage({ params }: { params: Promise<{ idea: string }> }) {
  const { idea: slug } = await params;
  const idea = findIdea(slug);
  if (!idea) notFound();

  return (
    <>
      <ProtoHome idea={idea} />
      <ProtoSwitcher slug={idea.slug} />
    </>
  );
}
