import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import Head from 'next/head';

function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>thumbnail quiz ! :p</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
