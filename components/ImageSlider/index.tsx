import * as React from 'react'
import styled from 'styled-components'
import { images } from '../../data/images'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useSlider from '../../hooks/useSlider'
import { useIsMobile } from '../../hooks/useMediaQuery'

const Slides = styled.div`
  position: relative;
  background-color: var(--neutral);
`

const Slide = styled.div<{ active: boolean }>`
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  opacity: ${(p) => (p.active ? '1' : '0')};

  &:not(:first-child) {
    position: absolute;
    z-index: 1;
  }
`

const Wipe = styled(motion.div)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--neutral);
  z-index: 2;
`

interface ImageSliderProps {
  loaded: boolean
  onLoaded: () => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ loaded, onLoaded }) => {
  const [startSlider, setStartSlider] = React.useState(false)
  const isMobile = useIsMobile()

  const activeSlide = useSlider({
    run: startSlider || isMobile,
    numberOfSlides: images.length,
  })

  return (
    <Slides
      onMouseEnter={() => setStartSlider(true)}
      onMouseLeave={() => setStartSlider(false)}
    >
      {images.map((img, idx) => {
        return (
          <Slide key={idx} active={activeSlide === idx}>
            {idx === 0 ? (
              <>
                <Wipe
                  animate={{ y: loaded ? '-100%' : '0' }}
                  transition={{
                    type: 'easeIn',
                    duration: 0.6,
                    delay: 0.2,
                  }}
                />
                <Image
                  priority
                  width={800}
                  height={1000}
                  src={img}
                  layout="responsive"
                  alt="Portrait of me"
                  onLoadingComplete={onLoaded}
                />
              </>
            ) : (
              <>
                <Image
                  width={800}
                  height={1000}
                  src={img}
                  layout="responsive"
                  alt="Portrait of me"
                />
              </>
            )}
          </Slide>
        )
      })}
    </Slides>
  )
}

export default ImageSlider
