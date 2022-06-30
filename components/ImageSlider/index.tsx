import * as React from 'react'
import { images } from '../../data/images'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useSlider from '../../hooks/useSlider'
import { useIsMobile } from '../../hooks/useMediaQuery'

interface ImageSliderProps {
  complete: boolean
  onComplete: () => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ complete, onComplete }) => {
  const [startSlider, setStartSlider] = React.useState(false)
  const isMobile = useIsMobile()
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const activeSlide = useSlider({
    run: complete && (startSlider || isMobile),
    numberOfSlides: images.length,
    speed: isMobile ? 1500 : 500,
  })

  return (
    <div
      className="relative"
      onMouseEnter={() => setStartSlider(true)}
      onMouseLeave={() => setStartSlider(false)}
    >
      {images.map((img, idx) => {
        const isActiveSlide = activeSlide === idx

        return (
          <div
            className={`absolute top-0 left-0 z-10 h-full w-full overflow-hidden first:relative first:z-20 ${
              isActiveSlide ? 'opacity-100' : 'opacity-0'
            }`}
            key={idx}
          >
            {idx === 0 ? (
              <>
                <motion.div
                  className="absolute top-0 left-0 z-20 h-full w-full bg-white"
                  animate={{ y: imageLoaded ? '-100%' : '0' }}
                  transition={{
                    type: 'easeIn',
                    duration: 0.6,
                    delay: 0.2,
                  }}
                  onAnimationComplete={onComplete}
                />
                <Image
                  priority
                  width={800}
                  height={1000}
                  src={img}
                  layout="responsive"
                  alt="Portrait of me"
                  onLoadingComplete={() => setImageLoaded(true)}
                />
              </>
            ) : (
              <>
                <Image
                  priority
                  width={800}
                  height={1000}
                  src={img}
                  layout="responsive"
                  alt="Portrait of me"
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ImageSlider
