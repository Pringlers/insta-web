import "@/styles/globals.css";
import "@/styles/normalize.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>정현스타그램</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </>
  );
}
