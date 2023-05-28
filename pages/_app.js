import "bootstrap/dist/css/bootstrap.css";

import "../styles/globals.css";


import Head from "next/head";

// add bootstrap css
// own css files here

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
