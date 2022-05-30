import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { createContext, useState } from "react";

export const gotContext = createContext();
export const setGotContext = createContext();

function MyApp({ Component, pageProps }) {
  const [got, setGot] = useState([]);
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <gotContext value={got}>
        <setGotContext value={setGot}>
          <MantineProvider
            theme={{ fontFamily: "Open Sans" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Component {...pageProps} />
          </MantineProvider>
        </setGotContext>
      </gotContext>
    </div>
  );
}

export default MyApp;
