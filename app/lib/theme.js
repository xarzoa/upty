import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  defaultProps: {
    borderRadius: 'xl'
  },
}

const theme = extendTheme({ config })

export default theme