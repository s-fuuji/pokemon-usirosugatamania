import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body className="px-10 pt-20 w-auto mx-auto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
