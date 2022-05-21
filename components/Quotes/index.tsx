import * as React from 'react'
import styled from 'styled-components'
import { quotes } from '../../data/quotes'
import useSlider from '../../hooks/useSlider'

interface QuotesProps {
  isVisible: boolean
}

const Wrapper = styled.div`
  position: relative;
`

const Container = styled.div<{ active: boolean }>`
  opacity: ${(p) => (p.active ? '1' : '0')};
  transition: opacity 1000ms;
  position: absolute;
  top: 0px;
  left: 0px;

  &:first-child {
    position: static;
  }
`

const Text = styled.blockquote`
  color: var(--neutral);
  font-style: italic;
  margin: 0px;
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 1.2rem;
  color: var(--neutral-800);
`

const Caption = styled.figcaption`
  color: var(--neutral);
  display: block;
  text-align: right;
  font-size: 0.6rem;
  margin-top: 0.6rem;
`

const Quotes: React.FC<QuotesProps> = ({ isVisible }) => {
  const activeQuote = useSlider({
    run: isVisible,
    numberOfSlides: quotes.length,
    speed: 3500,
  })

  return (
    <Wrapper>
      {quotes.map((quote, idx) => {
        return (
          <Container key={idx} active={activeQuote === idx}>
            <Text>{quote.text}</Text>
            <Caption>{quote.cite}</Caption>
          </Container>
        )
      })}
    </Wrapper>
  )
}

export default Quotes
