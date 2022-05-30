import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { PartyChangeContext } from "../contexts/gotPoke";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <PartyChangeContext>
        <MantineProvider
          theme={{ fontFamily: "Open Sans" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </PartyChangeContext>
    </div>
  );
}

export default MyApp;
