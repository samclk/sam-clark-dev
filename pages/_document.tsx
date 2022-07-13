import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&family=Source+Code+Pro:wght@300&display=swap"
            rel="stylesheet"
          />

          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Freelance web developer, enthusiastic about making websites and applications beautiful."
          ></meta>
          <link rel="canonical" href="https://samclark.io" />
          <meta name="robots" content="index, follow" />

          <meta property="og:type" content="website" />

          <meta
            property="og:title"
            content="Sam Clark | Developer, UI &amp; UX"
          />

          <meta
            property="og:description"
            content="Freelance web developer, enthusiastic about making websites and applications beautiful."
          />

          <meta property="og:image" content="image-card.jpg" />

          <meta property="og:url" content="https://samclark.io" />

          <meta property="og:site_name" content="samclark.io" />

          <meta
            name="twitter:title"
            content="Sam Clark | Developer, UI &amp; UX"
          />

          <meta
            name="twitter:description"
            content="Freelance web developer, enthusiastic about making websites and applications beautiful."
          />

          <meta name="twitter:image" content="image-card.jpg" />

          <meta name="twitter:site" content="@srclark_" />

          <meta name="twitter:creator" content="@srclark_"></meta>
          {/* Add Google Tag */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.NEXT_PUBLIC_GA_ID});
        `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
