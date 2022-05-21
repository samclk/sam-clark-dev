import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
    body {
        font-family: 'Roboto', sans-serif;
    }

    :root {
        --color-accent: #ff1f8f;
        --neutral: #fff;
        --neutral-800:  #999;
        --dark: #000;
    }

    * {
        box-sizing: border-box;
    }
 
`
