import '../styles/globals.css'
import '../styles/Drawer.scss'
import { ThemeProvider } from 'next-themes'

import type { AppProps } from 'next/app'
import Drawer from '../src/components/Drawer/Drawer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ThemeProvider>
    <Drawer/>
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
