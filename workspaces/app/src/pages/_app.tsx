import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {CommonLayout} from '../components/layouts/CommonLayout';

const gtagScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJHZYN5ZRS');`;

function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>thumbnail quiz ! :p</title>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-CJHZYN5ZRS" />
        <script dangerouslySetInnerHTML={{__html: gtagScript}} />
      </Head>
      <CommonLayout>
        <Component {...pageProps} />
      </CommonLayout>
    </ChakraProvider>
  );
}

export default App;
