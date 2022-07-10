import * as React from 'react'
import { quotes } from '../../data/quotes'
import useSlider from '../../hooks/useSlider'

interface QuotesProps {
  isVisible: boolean
}

const Quotes: React.FC<QuotesProps> = ({ isVisible }) => {
  const activeQuote = useSlider({
    run: isVisible,
    numberOfSlides: quotes.length,
    speed: 3500,
  })

  return (
    <div className="relative">
      {quotes.map((quote, idx) => {
        const isActiveQuote = activeQuote === idx

        return (
          <div
            className={`absolute top-0 left-0 w-full first:static  ${
              isActiveQuote ? 'opacity-100' : 'opacity-0'
            }`}
            key={idx}
          >
            <blockquote className="m-0 text-xs italic text-gray-200">
              {quote.text}
            </blockquote>
            <figcaption className="mt-2 block text-right text-xs text-white">
              {quote.cite}
            </figcaption>
          </div>
        )
      })}
    </div>
  )
}

export default Quotes
