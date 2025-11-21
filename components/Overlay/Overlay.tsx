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
    <div className="flex flex-col items-center gap-12 lg:flex-row">
      <div>
        <h1 className="font-montserrat text-5xl leading-[0.9em] tracking-[-0.08em] text-white">
          sam clark
          <br />
          creative full stack
          <br />
          developer
        </h1>
      </div>
      <div className="relative">
        <span
          id="coords"
          className="font-space-mono absolute bottom-full right-0 mb-2 hidden text-xs text-black opacity-0 lg:block"
        ></span>
        <div
          id="overlay-container"
          className="bg-red/60 text-md max-w-[580px] p-6 text-black lg:p-8 lg:text-xs"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <div id="overlay-content" className="font-space-mono opacity-0">
            <div className="w-fit">
              <h2 className="mb-2 font-bold uppercase lg:mb-4">Works</h2>
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
      </div>
    </div>
  );
};
