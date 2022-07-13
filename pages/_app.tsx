import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import Socials from '../components/Socials'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Socials />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
