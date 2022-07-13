import { motion } from 'framer-motion'
import Head from 'next/head'

interface LayoutProps {
  title: string
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.main>
    </>
  )
}

export default Layout
