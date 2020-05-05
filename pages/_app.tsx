import '../utils/style/reset.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { AppProps } from 'next/app'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
