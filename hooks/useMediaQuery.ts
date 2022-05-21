import * as React from 'react'
import { device } from '../styles/breakpoints'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => media.addEventListener('change', listener)
  }, [matches, query])

  return matches
}

export const useIsMobile = () => useMediaQuery(device.mobile)
export const useIsTablet = () => useMediaQuery(device.tablet)
export const useIsDesktop = () => useMediaQuery(device.desktop)
