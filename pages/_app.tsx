import '../utils/style/reset.css'
import '../utils/style/animista.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {AppProps} from 'next/app'
import React from 'react'
import {ThemeProvider} from '@material-ui/core'
import {theme} from '../utils/style/theme'
import Head from 'next/head'
import {Message} from '../utils/components/Message/Message'
import {DateWrapperApollo} from '../utils/components/DateWarpper'

export default function MyApp({Component, pageProps}: AppProps) {
  return [
    DateWrapperApollo,
  ].reduce((previousValue: any, currentValue: any) => currentValue(previousValue),
      <>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Market Payless</title>
          </Head>
          <Component {...pageProps} />
          <Message/>
        </ThemeProvider>
      </>)
}

