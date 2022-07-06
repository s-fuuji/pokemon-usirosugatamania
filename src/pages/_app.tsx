import '../styles/globals.css'
import { Header } from '../components/layout/Header'
import { store } from '../slicer/store'
import { AppProps } from 'next/dist/shared/lib/router/router'
import React from 'react'
import persistStore from 'redux-persist/lib/persistStore'
import { AppProviders } from '../providers/AppProviders'

function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store)
  return (
    <div>
      <AppProviders>
        <Header />

        <Component {...pageProps} />
      </AppProviders>
    </div>
  )
}

export default MyApp
