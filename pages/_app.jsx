import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { PartyChangeContext } from "../contexts/gotPoke";
import { Header } from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-quiz-back min-h-screen">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <PartyChangeContext>
        <MantineProvider
          theme={{ fontFamily: "Open Sans" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Header />
          <Component {...pageProps} />
        </MantineProvider>
      </PartyChangeContext>
    </div>
  );
}

export default MyApp;
