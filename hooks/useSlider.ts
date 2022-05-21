import * as React from 'react'

interface useSliderProps {
  run: boolean
  numberOfSlides: number
  speed?: number
}

const useSlider = ({ run, numberOfSlides, speed = 500 }: useSliderProps) => {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const intervalId = React.useRef<NodeJS.Timer>()

  React.useEffect(() => {
    if (run) {
      intervalId.current = setInterval(() => {
        setActiveSlide((n) => {
          if (n + 1 === numberOfSlides) {
            return 0
          }
          return n + 1
        })
      }, speed)
    } else {
      clearInterval(intervalId.current)
    }
    return () => clearInterval(intervalId.current)
  }, [run, numberOfSlides, speed])

  return activeSlide
}

export default useSlider
