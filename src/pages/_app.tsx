import Head from 'next/head'
import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Header } from '../components/layout/Header'
import { store } from '../slicer/store'
import { Provider } from 'react-redux'
import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/lib/persistStore'
import { AppProviders } from '../providers/AppProviders'

function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store)
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppProviders>
        <Header />

        <Component {...pageProps} />
      </AppProviders>
    </div>
  )
}

export default MyApp
