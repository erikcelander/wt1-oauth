import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

/**
 * The root component of the application.
 * 
 * @param {AppProps} props - The properties passed to the component.
 * @returns {JSX.Element} The application's layout.
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>

      <Helmet>
        <title>WT1 - GitLab OAuth</title>
        <meta charSet="utf-8" />
        <meta name="author" content="Erik Kroon Celander" />
        <meta name="description" content="A Next.js application that uses GitLab OAuth to authenticate users." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval'; img-src 'self' https://gitlab.lnu.se https://secure.gravatar.com; style-src 'unsafe-inline'" />


        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3d4e53" />
        <link rel="shortcut icon" href="public/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      <main className={inter.className}>

        <Component {...pageProps} />
      </main>
    </>
  )
}
