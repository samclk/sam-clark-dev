import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useIsTablet } from '../../hooks/useMediaQuery'
import { device } from '../../styles/breakpoints'
import Quotes from '../Quotes'

interface FormWrapperProps {
  isVisible: boolean
  children?: React.ReactNode
}

const FixedWrapper = styled(motion.div)`
  position: fixed;
  height: 100vh;
  left: 0px;
  top: 0px;
  width: 100%;
  background-color: var(--dark);
  z-index: 3;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transform: translate(0, -100%);

  @media ${device.tablet} {
    right: 0px;
    left: auto;
    width: 40vw;
    max-width: 400px;
    transform: translate(100%, 0);
  }
`

const Top = styled(motion.div)``

const Bottom = styled.div``

const FormWrapper: React.FC<FormWrapperProps> = ({ isVisible, children }) => {
  const isTablet = useIsTablet()

  return (
    <>
      {isTablet && (
        <FixedWrapper
          initial={{ x: '100%' }}
          animate={{ x: isVisible ? 0 : '100%' }}
          transition={{ type: 'easeOut', duration: 0.4 }}
        >
          <Top
            initial={{ x: '30%', opacity: 0 }}
            animate={{
              x: isVisible ? 0 : '30%',
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ type: 'easeOut', duration: 0.4, delay: 0.15 }}
          >
            {children}
          </Top>
          <Bottom>
            <Quotes isVisible={isVisible} />
          </Bottom>
        </FixedWrapper>
      )}
      {!isTablet && (
        <FixedWrapper
          initial={{ y: '-100%' }}
          animate={{ y: isVisible ? 0 : '-100%' }}
          transition={{ type: 'easeOut', duration: 0.4 }}
        >
          <Top
            initial={{ y: '-30%', opacity: 0 }}
            animate={{
              y: isVisible ? 0 : '-30%',
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ type: 'easeOut', duration: 0.4, delay: 0.15 }}
          >
            {children}
          </Top>
          <Bottom>
            <Quotes isVisible={isVisible} />
          </Bottom>
        </FixedWrapper>
      )}
    </>
  )
}

export default FormWrapper
