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
  HStack,
  Center
} from '@chakra-ui/react';
import HelpIcon from '@components/icons/help';
import DiscordIcon from '@components/icons/brand/discord';
import TelegramIcon from '@components/icons/brand/telegram';
import ProductHuntIcon from '@components/icons/brand/productHunt';
import GithubIcon from '@components/icons/brand/github';


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
            <HStack>
            </HStack>
            <Center>
            <IconButton
              size="lg"
              p={1}
              m={2}
              bg="#5865F2"
              icon={<DiscordIcon />}
              onClick={() => location.href = 'https://discord.gg/aAdzKUKTkq'}
            />
            <IconButton
              size="lg"
              p={1}
              m={2}
              bg="#DA552F"
              icon={<ProductHuntIcon />}
              onClick={() => location.href = 'https://producthunt.com/post/upty'}
            />
            <IconButton
              size="lg"
              p={1}
              m={2}
              bg="#26A5E4"
              icon={<TelegramIcon />}
              onClick={() => location.href = 'https://t.me/upty'}
            />
            <IconButton
              size="lg"
              p={1}
              m={2}
              bg="#181717"
              icon={<GithubIcon />}
              onClick={() => location.href = 'https://github.com/xarzoa/upty'}
            />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
