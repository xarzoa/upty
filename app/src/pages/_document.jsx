import { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default function Document() {
  return (
    <Html>
      <Head />
      <body lang='en'>
        <ColorModeScript initialColorMode='dark' />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
