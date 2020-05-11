import '../utils/style/reset.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import {theme} from '../utils/style/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
