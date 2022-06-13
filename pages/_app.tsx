import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Header } from "../components/layout/Header";
import { store } from "../slicer/store"
import { Provider } from "react-redux";
import { AppProps } from "next/dist/shared/lib/router/router";
import React from 'react'
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";

function MyApp({ Component, pageProps }: AppProps) {

  let persistor = persistStore(store);
  return (
    <div className="bg-quiz-back min-h-screen">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MantineProvider
            theme={{ fontFamily: "Open Sans" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Header />
            <main className="pt-24">
              <Component {...pageProps} />
            </main>
          </MantineProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default MyApp;
