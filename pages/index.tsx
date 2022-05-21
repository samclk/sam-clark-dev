import * as React from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { device } from '../styles/breakpoints'
import { useIsTablet } from '../hooks/useMediaQuery'
import Socials from '../components/Socials'
import ContactForm from '../components/ContactForm'
import ImageSlider from '../components/ImageSlider'

const Wrapper = styled(motion.div)`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-width: 95vw;
  margin: 0 auto;

  @media ${device.tablet} {
    max-width: none;
  }
`

const ImageContainer = styled.div<{ $formIsVisible: boolean }>`
  position: relative;
  width: 40vw;
  max-width: 400px;
  z-index: 1;
  ${(p) => p.$formIsVisible && `pointer-events: none;`}
`

const TextContainer = styled(motion.div)<{ $formIsVisible: boolean }>`
  position: relative;
  z-index: 2;
  ${(p) => p.$formIsVisible && `pointer-events: none;`}
`

const PinkSquare = styled(motion.div)`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: var(--color-accent);
  width: 100%;
  height: 100%;
`

const Heading = styled.h1`
  font-size: 2rem;
  margin: 0;

  @media ${device.tablet} {
    font-size: 4rem;
  }
`

const SmallHeading = styled.h2`
  font-size: 1.4rem;
  margin: 0;

  @media ${device.tablet} {
    font-size: 2rem;
  }
`

const Button = styled.button`
  font-size: 0.8rem;
  padding: 0.5em 1em;
  background-color: transparent;
  border: 2px solid black;
  cursor: pointer;
  transition: border-color 300ms, background-color 300ms;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }
`

const CTA = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  @media ${device.tablet} {
    margin-top: 2rem;
  }
`

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
    <>
      <Wrapper
        animate={
          isTablet
            ? {
                x: formIsVisible ? '-20%' : 0,
                opacity: formIsVisible ? 0.2 : 1,
              }
            : {
                y: formIsVisible ? '20%' : 0,
                opacity: formIsVisible ? 0.2 : 1,
              }
        }
        transition={{ type: 'easeOut', duration: 0.4, delay: 0.1 }}
        onClick={closeForm}
      >
        <ImageContainer $formIsVisible={formIsVisible}>
          <PinkSquare
            initial={{ x: 0, y: 0 }}
            animate={
              isTablet
                ? {
                    x: imageLoaded ? '-1rem' : '0',
                    y: imageLoaded ? '-1rem' : '0',
                  }
                : {
                    x: imageLoaded ? '-.5rem' : '0',
                    y: imageLoaded ? '-.5rem' : '0',
                  }
            }
            transition={{ type: 'ease', duration: 0.2, delay: 0.6 }}
          />
          <ImageSlider
            loaded={imageLoaded}
            onLoaded={() => setImageLoaded(true)}
          />
        </ImageContainer>
        <TextContainer
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: '-2rem', opacity: 1 }}
          transition={{ type: 'ease', delay: 0.2 }}
          $formIsVisible={formIsVisible}
        >
          <Heading>Sam Clark</Heading>
          <SmallHeading>Developer, UI & UX</SmallHeading>
          <CTA>
            <Button onClick={() => setFormIsVisible(true)}>Message</Button>
            <Socials />
          </CTA>
        </TextContainer>
      </Wrapper>
      <ContactForm isVisible={formIsVisible} closeForm={closeForm} />
    </>
  )
}

export default Home
