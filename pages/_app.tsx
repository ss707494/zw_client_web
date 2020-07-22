import '../utils/style/reset.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {AppProps} from 'next/app'
import React from 'react'
import {ThemeProvider} from '@material-ui/core'
import {theme} from '../utils/style/theme'
import Head from 'next/head'
import {Message} from '../utils/components/Message/Message'

export default function MyApp({Component, pageProps}: AppProps) {
  return <ThemeProvider theme={theme}>
    <Head>
      <title>Market Payless</title>
    </Head>
    <Component {...pageProps} />
    <Message/>
  </ThemeProvider>
}

