import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { socials } from '../../data/socials'

const SocialVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const SocialIconVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
}

const Socials: React.FC = () => {
  return (
    <motion.div
      variants={SocialVariants}
      initial="hidden"
      animate="show"
      className="fixed mt-4 flex w-full justify-center gap-3"
    >
      {socials.map((social, idx) => {
        return (
          <Link key={idx} href={social.url} passHref>
            <motion.a
              variants={SocialIconVariants}
              target="_blank"
              className="hover:text-pink-600"
            >
              {social.icon}
            </motion.a>
          </Link>
        )
      })}
    </motion.div>
  )
}

export default Socials
