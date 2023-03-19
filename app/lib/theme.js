import { extendTheme } from '@chakra-ui/react';

const baseStyle = { borderRadius: 'xl' };

const config = {
  components: {
    Button: { baseStyle },
    Input: { baseStyle },
    Card: { baseStyle },
    ModalContent: { baseStyle }
  },
};

const theme = extendTheme(config);

export default theme;
