import {ChakraProvider} from '@chakra-ui/react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import {CommonLayout} from '../components/layouts/CommonLayout';

const title = 'Thumbnail Quiz ! :p';
const description =
  'Answer the correct answer from the 4 thumbnail images! How much do you know? :p';
const keywords = ['thumbnail-quiz', 'quiz', 'youtube'];
const ogpImage = 'https://thumbnail-quiz.com/ogp.png';

const gtagScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJHZYN5ZRS');`;

function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <link rel="icon" href="/square.png" />
        <link rel="apple-touch-icon" href="/square.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords?.join(',')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:image" content={ogpImage} />
        <meta name="twitter:image" content={ogpImage} />
        <title>{title}</title>
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
