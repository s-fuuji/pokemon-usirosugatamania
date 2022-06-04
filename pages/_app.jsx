import Head from "next/head";
import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Header } from "../components/layout/header";
import { store } from "../slicer/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-quiz-back min-h-screen">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default MyApp;
