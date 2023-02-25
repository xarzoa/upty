import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Progress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Progress color="#9AE6B4" height={2} showOnShallow={true} options={{ showSpinner: false }}/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}