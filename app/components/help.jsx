import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Button,
  Divider,
  IconButton,
  useDisclosure,
  Tooltip,
  Center
} from '@chakra-ui/react';
import HelpIcon from '@components/icons/help';
import DiscordIcon from '@components/icons/brand/discord';
import TelegramIcon from '@components/icons/brand/telegram';
import ProductHuntIcon from '@components/icons/brand/productHunt';



export default function Notifications({ dest }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label="Support"
        bg="white"
        closeDelay={1500}
        borderRadius="xl"
        placement={dest !== '/dashboard' ? 'left' : 'bottom'}
      >
        <IconButton
          size="lg"
          p={1}
          bg="gray.700"
          icon={<HelpIcon />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl">
          <ModalBody>
            <Center>
            
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
