import { tv } from 'tailwind-variants';
import type { HeadingLevel } from '@/types/headingLevel';
import { WetInk } from '@/components/WetInk';

const EMAIL = 'sam@clkstudio.co.uk';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/sam.cl.rk/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sam-clark-5b712087/' },
  { label: 'GitHub', href: 'https://github.com/samclk' },
];

const contact = tv({
  slots: {
    root: 'mt-section border-t border-hairline pt-section',
    title: 'mono font-normal text-faint',
    mailWrap: 'mt-10',
    mail: 'group relative inline-block text-mail font-medium tracking-[-0.028em] break-words transition-colors duration-[420ms] hover:text-accent',
    rule: 'absolute inset-x-0 bottom-1 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-[760ms] ease-brand group-hover:scale-x-100',
    socials: 'mt-14 flex flex-wrap gap-9',
    link: 'ln inline-block py-3.5 mono',
  },
});

const { root, title, mailWrap, mail, rule, socials, link } = contact();

export const Contact = ({ headingLevel = 2 }: { headingLevel?: HeadingLevel }) => {
  const Heading = `h${headingLevel}` as const;

  return (
    <section className={root()} id="contact">
      <Heading className={title()}>Contact</Heading>

      <WetInk target={`a[href^="mailto:"]`}>
        <p className={mailWrap()}>
          <a className={mail()} href={`mailto:${EMAIL}`}>
            {EMAIL}
            <span className={rule()} aria-hidden="true" />
          </a>
        </p>
      </WetInk>

      <ul className={socials()}>
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a className={link()} href={social.href} rel="me noreferrer" target="_blank">
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
