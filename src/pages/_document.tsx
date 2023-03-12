import { Html, Head, Main, NextScript } from 'next/document'

/**
 * The custom Next.js document component, used to customize the HTML document served to the client.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
