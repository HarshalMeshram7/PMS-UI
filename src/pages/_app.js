import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import useStorage from 'src/hooks/useStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const router = useRouter();
  const { loggedInUserName } = useStorage();
  useEffect(() => {
    if (!loggedInUserName) {
      if (router.pathname !== "/register") {
        router.push("/login")
      }
    }
  }, [loggedInUserName])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (

    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          PMS
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider >
    </CacheProvider>

  );
};

export default App;
