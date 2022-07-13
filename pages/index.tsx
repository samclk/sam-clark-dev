import * as React from 'react'
import type { NextPage } from 'next'
import { motion } from 'framer-motion'
import { useIsTablet } from '../hooks/useMediaQuery'
import ContactForm from '../components/ContactForm'
import ImageSlider from '../components/ImageSlider'
import Link from 'next/link'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [formIsVisible, setFormIsVisible] = React.useState(false)
  const isTablet = useIsTablet()

  /**
   * Close form if it is visible
   */
  const closeForm = React.useCallback(() => {
    if (formIsVisible) {
      setFormIsVisible(false)
    }
  }, [formIsVisible])

  return (
    <Layout title="Sam Clark | Developer, UI &amp; UX">
      <motion.div
        className="fixed mx-auto flex w-full items-center justify-center px-4 pt-[30vh] md:min-h-screen md:pt-0"
        animate={
          isTablet
            ? {
                x: formIsVisible ? '-20%' : 0,
                opacity: formIsVisible ? 0.2 : 1,
              }
            : {
                y: formIsVisible ? '10%' : 0,
                opacity: formIsVisible ? 0.2 : 1,
              }
        }
        transition={{ type: 'easeOut', duration: 0.4, delay: 0.1 }}
        onClick={closeForm}
      >
        <div
          className={`relative z-10 w-1/2 max-w-sm ${
            formIsVisible ? 'pointer-events-none' : ''
          }`}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-full bg-pink-500"
            initial={{ x: 0, y: 0 }}
            animate={
              isTablet
                ? {
                    x: '-1rem',
                    y: '-1rem',
                  }
                : {
                    x: '-.5rem',
                    y: '-.5rem',
                  }
            }
            transition={{ type: 'ease', duration: 0.2, delay: 0.6 }}
          />
          <ImageSlider
            complete={imageLoaded}
            onComplete={() => setImageLoaded(true)}
          />
        </div>
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: '-2rem', opacity: 1 }}
          transition={{ type: 'ease', delay: 0.2 }}
          className={`relative z-20 ${
            formIsVisible ? 'pointer-events-none' : ''
          }`}
        >
          <h1 className="pointer-events-none m-0 text-4xl lg:text-7xl">
            Sam Clark
          </h1>
          <h2 className="pointer-events-none m-0 text-xl lg:text-4xl">
            Developer, UI &amp; UX
          </h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', delay: 0.6, duration: 1.5 }}
            className="pointer-events-none mt-2 text-right font-code text-xs text-gray-500"
          >
            52.7517° N, 0.4023° E
          </motion.p>
          <div className="mt-4 flex items-center">
            <button
              className="cursor-pointer border-2 border-black bg-transparent py-2 px-4 text-sm uppercase hover:border-pink-600 hover:bg-pink-600 hover:text-white"
              onClick={() => setFormIsVisible(true)}
            >
              Message
            </button>
            <Link href={'/about'}>
              <a className="ml-2 cursor-pointer  bg-transparent py-2 px-4 text-sm uppercase hover:text-pink-600">
                About
              </a>
            </Link>
          </div>
        </motion.div>
      </motion.div>
      <ContactForm isVisible={formIsVisible} closeForm={closeForm} />
    </Layout>
  )
}

export default Home
