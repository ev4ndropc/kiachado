import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import '../styles/globals.css'

import colors from '../theme'
const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
