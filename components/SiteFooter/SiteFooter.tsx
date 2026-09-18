import { tv } from 'tailwind-variants';

const siteFooter = tv({
  slots: {
    root: 'mx-auto flex max-w-[1440px] items-center gap-6 px-gutter pt-[72px] pb-14',
    copy: 'mono text-faint',
    link: 'ln ml-auto py-3.5 mono text-faint',
  },
});

const { root, copy, link } = siteFooter();

export const SiteFooter = () => {
  return (
    <footer className={root()}>
      <p className={copy()}>© {new Date().getFullYear()} CLK Studio</p>
      <a className={link()} href="#top">
        Back to top
      </a>
    </footer>
  );
};
