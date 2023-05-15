import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'

import { store } from '../store/store'

import '../styles/globals.scss'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      <Component {...pageProps} />
    </Provider>)
}
