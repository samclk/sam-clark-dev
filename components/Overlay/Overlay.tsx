'use client';

import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaLongArrowAltRight } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';

const WEBSITE_LINKS = [
  {
    title: 'Backstage with Bon Jovi',
    url: 'https://backstage.bonjovi.com/',
  },
  {
    title: 'Natoora',
    url: 'https://natoora.com/en-GB/',
  },
  {
    title: 'Neverbland Studio',
    url: 'https://neverbland.com/',
  },
  {
    title: 'RSPCA Assured',
    url: 'https://www.rspcaassured.org.uk/',
  },
];

const SOCIAL_LINKS: { title: string; url: string; icon: React.ReactElement }[] = [
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/sam.cl.rk/',
    icon: <FaInstagram />,
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sam-clark-5b712087/',
    icon: <FaLinkedin />,
  },
  {
    title: 'GitHub',
    url: 'https://github.com/samclk',
    icon: <FaGithub />,
  },
];

export const Overlay = () => {
  return (
    <div
      id="overlay-container"
      className="bg-red text-md max-w-[650px] p-6 text-black lg:p-8"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      <div id="overlay-content" className="font-space-mono grid gap-12 opacity-0 lg:grid-cols-2 lg:gap-24">
        <div>
          <h1 className="mb-2 font-bold uppercase lg:mb-4">CLK Development</h1>
          <p>A dedicated full stack senior developer, determined to make the web a more beautiful place.</p>
        </div>
        <div className="w-fit">
          <h2 className="mb-2 font-bold lg:mb-4">Works</h2>
          <ul>
            {WEBSITE_LINKS.map((link) => (
              <li key={link.title}>
                <a
                  href={link.url}
                  className="flex items-center gap-2 whitespace-nowrap hover:opacity-50"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.title}
                  <FaLongArrowAltRight />
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-4 flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.title}>
                <a href={link.url} className="whitespace-nowrap hover:opacity-50" target="_blank" rel="noreferrer">
                  {link.icon}
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:samclark.dev@gmail.com"
                className="whitespace-nowrap hover:opacity-80"
                target="_blank"
                rel="noreferrer"
              >
                <FaRegEnvelope />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
