import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface AboutProps {
  closeAbout: () => void
}

const About: React.FC<AboutProps> = ({ closeAbout }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="about"
      className="mx-auto max-w-md px-4 pt-24"
    >
      <div className="relative mb-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{
            delay: 0.2,
            duration: 1,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="absolute -right-4 -z-10 h-1/2 w-1/2"
        >
          <Image
            src="/me/family.jpg"
            priority
            width={800}
            height={1000}
            layout="responsive"
            alt="Photo of family"
          />
        </motion.div>
        <h2 className="mb-8 text-2xl">
          Hi, I’m <span className="text-pink-600">Sam</span>
        </h2>
        <p className="mb-6">
          A freelance web developer based in King’s Lynn. I have 10 years
          experience working in creative design agencies on a variety of
          projects from start ups to established applications.
        </p>
        <p className="mb-6">
          I specialise in full stack applications using a variety of
          technologies but primarily focused on Typescript, Next.js, React, Node
          and Cypress. I am always looking to expand my toolkit but also see
          value in spending time to learn and incorporate a piece of tech into
          my workflow before always jumping to the ‘next big thing’.
        </p>
        <p className="mb-6">
          Having graduated in animation technology at university I was able to
          take what was a passionate hobby in development and turn it into my
          career. This has lead me to not only understand the requirements to
          get a job done, but also do it with an aesthetic and user experience
          that I can be proud of.
        </p>
        <button
          className="block cursor-pointer text-xs uppercase text-pink-600"
          onClick={closeAbout}
        >
          Back
        </button>
      </div>
    </motion.div>
  )
}

export default About
