import {
  IconButton,
  useDisclosure,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import PlusIcon from '@components/icons/plus';
import { useState } from 'react';

export default function AddMonitor() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState();
  const [name, setName] = useState('');
  const [uloading, setULoading] = useState();
  const toast = useToast();
  function check(url) {
    const regex = new RegExp(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    );
    return regex.test(url);
  }

  const nameError = name === '';
  const urlError = !check(url);
  const disabled = nameError || urlError

  const addUrl = async (e) => {
    setULoading(true);
    if (!nameError && !urlError) {
      const res = await fetch('/api/addMonitor', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, url: url.toLowerCase() }),
      });
      toast({
        title: 'Done!',
        description: 'Successfully added your monitor.',
        status: 'success',
        position: 'bottom-left',
        isClosable: true,
      });
      setUrl('')
      setName('')
    } else {
      toast({
        title: 'Error!',
        description: "Something's wrong!",
        status: 'error',
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setULoading(false);
  };

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }
  return (
    <>
      <Tooltip
        hasArrow
        label="Add monitor"
        bg="white"
        closeDelay={1500}
        borderRadius="xl"
        placement="left"
      >
        <IconButton
          p={1}
          size="lg"
          colorScheme="green"
          icon={<PlusIcon />}
          onClick={onOpen}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader>Add Monitor</ModalHeader>
          <Divider />
          <ModalBody>
            <FormControl pt={3}>
              <FormLabel>Monitor name</FormLabel>
              <Input
                isInvalid={nameError}
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                placeholder="Name?"
                borderRadius="xl"
              />
            </FormControl>
            <FormControl pt={3}>
              <FormLabel>URL</FormLabel>
              <Input
                isInvalid={urlError}
                type="link"
                name="url"
                value={url}
                onChange={handleUrl}
                placeholder="URL?"
                borderRadius="xl"
              />
              <FormHelperText>With http or https</FormHelperText>
            </FormControl>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} mr={3}>
              Close
            </Button>
            <Button
              colorScheme="green"
              loadingText="Adding..."
              onClick={addUrl}
              isDisabled={disabled}
              isLoading={uloading}
            >
              Add 
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
