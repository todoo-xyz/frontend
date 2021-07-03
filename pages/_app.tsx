import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Home | todoo.xyz</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
