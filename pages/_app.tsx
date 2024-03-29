import '../styles/globals.css';
import '../@axframe-datagrid/style.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React Frame DataGrid</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='React Frame DataGrid example' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
