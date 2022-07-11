import { motion } from 'framer-motion'
import { useIsTablet } from '../../hooks/useMediaQuery'
import Quotes from '../Quotes'

interface FormWrapperProps {
  isVisible: boolean
  children?: React.ReactNode
}

const FormWrapper: React.FC<FormWrapperProps> = ({ isVisible, children }) => {
  const isTablet = useIsTablet()

  return (
    <>
      {isTablet && (
        <motion.div
          className="fixed left-0 top-0 z-30 box-border flex h-screen w-full -translate-y-full flex-col justify-between bg-black p-8 shadow-3xl lg:right-0 lg:left-auto lg:w-1/2 lg:max-w-lg lg:translate-x-full"
          initial={{ x: '100%' }}
          animate={{ x: isVisible ? 0 : '100%' }}
          transition={{ type: 'easeOut', duration: 0.4 }}
        >
          <motion.div
            initial={{ x: '30%', opacity: 0 }}
            animate={{
              x: isVisible ? 0 : '30%',
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ type: 'easeOut', duration: 0.4, delay: 0.15 }}
          >
            {children}
          </motion.div>
          <div>
            <Quotes isVisible={isVisible} />
          </div>
        </motion.div>
      )}
      {!isTablet && (
        <motion.div
          className="fixed left-0 top-0 z-30 box-border flex h-screen w-full -translate-y-full flex-col justify-between bg-black p-8 lg:right-0 lg:left-auto lg:w-40 lg:max-w-md lg:translate-x-full"
          initial={{ y: '-100%' }}
          animate={{ y: isVisible ? 0 : '-100%' }}
          transition={{ type: 'easeOut', duration: 0.4 }}
        >
          <motion.div
            initial={{ y: '-30%', opacity: 0 }}
            animate={{
              y: isVisible ? 0 : '-30%',
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ type: 'easeOut', duration: 0.4, delay: 0.15 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default FormWrapper
