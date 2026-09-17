import { FaGithub, FaInstagram, FaLinkedin, FaLongArrowAltRight, FaRegEnvelope } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';
import { animationIds } from '@/utils/animationIds';

const COORDS = '52.7517° N, 0.4023° E';

const WEBSITE_LINKS = [
  { title: 'Backstage with Bon Jovi', url: 'https://backstage.bonjovi.com/' },
  { title: 'Natoora', url: 'https://natoora.com/en-GB/' },
  { title: 'Neverbland Studio', url: 'https://neverbland.com/' },
  { title: 'RSPCA Assured', url: 'https://www.rspcaassured.org.uk/' },
];

const SOCIAL_LINKS: { title: string; url: string; Icon: IconType }[] = [
  { title: 'Instagram', url: 'https://www.instagram.com/sam.cl.rk/', Icon: FaInstagram },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/sam-clark-5b712087/', Icon: FaLinkedin },
  { title: 'GitHub', url: 'https://github.com/samclk', Icon: FaGithub },
];

const overlay = tv({
  slots: {
    root: 'flex flex-col items-center gap-12 lg:flex-row',
    name: 'font-montserrat text-5xl leading-[0.9em] tracking-[-0.08em] text-white',
    panel: 'relative',
    coords: 'absolute right-0 bottom-full mb-2 hidden font-space-mono text-xs text-black opacity-0 lg:block',
    container: 'max-w-[580px] bg-red/60 p-6 text-base text-black lg:p-8 lg:text-xs',
    content: 'font-space-mono opacity-0',
    inner: 'w-fit',
    title: 'mb-2 font-bold uppercase lg:mb-4',
    link: 'flex items-center gap-2 whitespace-nowrap hover:opacity-50',
    socials: 'mt-4 flex items-center gap-2',
    socialLink: 'block whitespace-nowrap hover:opacity-50',
  },
});

const { root, name, panel, coords, container, content, inner, title, link, socials, socialLink } = overlay();

export const Overlay = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <div className={root()}>
      <div>
        <h1 className={name()}>
          sam clark
          <br />
          creative full stack
          <br />
          developer
        </h1>
      </div>
      <div className={panel()}>
        <span id={animationIds.coords} className={coords()}>
          {COORDS}
        </span>
        <div id={animationIds.overlayContainer} className={container()} style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <div id={animationIds.overlayContent} className={content()}>
            <div className={inner()}>
              <Heading className={title()}>Works</Heading>
              <ul>
                {WEBSITE_LINKS.map((work) => (
                  <li key={work.title}>
                    <a
                      href={work.url}
                      className={link()}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${work.title} (opens in a new tab)`}
                    >
                      {work.title}
                      <FaLongArrowAltRight aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
              <ul className={socials()}>
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.title}>
                    <a
                      href={social.url}
                      className={socialLink()}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${social.title} (opens in a new tab)`}
                    >
                      <social.Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:samclark.dev@gmail.com" className={socialLink()} aria-label="Email Sam Clark">
                    <FaRegEnvelope aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
