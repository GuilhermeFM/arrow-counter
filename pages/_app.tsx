import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Arrow shooting counter" />
        <meta name="keywords" content="Arrow, Counter" />
        <title>Arrow Counter</title>

        <link rel="manifest" href="/manifest.json" />

        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />

        <link
          href="/favicon-96x96.png"
          rel="icon"
          type="image/png"
          sizes="96x96"
        />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>

        <meta name="theme-color" content="#27272a" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
