import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from '@components/head';
import Header from '@components/header';
import Status from '@components/status';
import {
  AbsoluteCenter,
  Container,
  VStack,
  Heading,
  Button,
  Card,
  CardBody,
  Box,
  Spinner,
  Flex,
  Spacer,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function EditMonitor() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = router.query;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/getMonitor/${id}`, fetcher, {
    refreshInterval: 1000,
  });
  const headData = {
    title: 'Upty - Edit Monitor ' + data?.key,
    description: 'Uptime monitor for Detonions',
    favicon: '/favicon.ico',
  };

  function checkURL(url) {
    const monitorRegex = new RegExp(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    );

    return monitorRegex.test(url);
  }

  function checkWebhook(webhook) {
    const webhookRegex = new RegExp(
      /^https?:\/\/discord.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/
    );

    if (!webhook) {
      return true;
    }

    return webhookRegex.test(webhook);
  }

  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [webhook, setWebhook] = useState();
  const [loading, setLoading] = useState();
  const [delLoading, setDelLoading] = useState();
  const nameError = name === '';
  const urlError = !checkURL(url);
  const webhookError = !checkWebhook(webhook);
  const toast = useToast();

  useEffect(() => {
    setName(data?.name);
    setUrl(data?.url);
    setWebhook(data?.webhook);
  }, [data]);

  async function deleteMonitor() {
    setDelLoading(true);
    try {
      await fetch('/api/deleteMonitor', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      toast({
        title: 'Done!',
        description: `Successfully deleted your ${id} monitor.`,
        status: 'success',
        position: 'bottom-left',
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error!',
        description: `${e.message} happend.`,
        status: 'error',
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setDelLoading(false);
    router.push('/dashboard');
  }

  async function update() {
    setLoading(true);
    if (!nameError && !urlError && !webhookError) {
      const res = await fetch('/api/updateMonitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          url: url.toLowerCase(),
          webhook: webhook,
          key: id,
        }),
      });
      toast({
        title: 'Done!',
        description: 'Successfully updated your monitor.',
        status: 'success',
        position: 'bottom-left',
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error!',
        description: 'Something went wrong!',
        status: 'error',
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setLoading(false);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleWebhook(e) {
    setWebhook(e.target.value);
  }

  return (
    <>
      <Head data={headData} />
      <Container centerContent="true" minH="100vh" p={4}>
        {!isLoading ? (
          <VStack spacing={2} align="stretch" w="100%">
            <Header />
            <Card borderRadius="xl">
              <CardBody>
                <Heading size="md">Edit Monitor</Heading>
                <FormControl pt={3}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name?"
                    borderRadius="xl"
                    onChange={handleName}
                    isInvalid={nameError}
                    value={name}
                  />
                </FormControl>
                <FormControl pt={3}>
                  <FormLabel>URL</FormLabel>
                  <Input
                    type="link"
                    name="url"
                    placeholder="URL?"
                    borderRadius="xl"
                    onChange={handleUrl}
                    isInvalid={urlError}
                    value={url}
                  />
                  <FormHelperText>With http or https</FormHelperText>
                </FormControl>
                <FormControl pt={3}>
                  <FormLabel>Discord webhook</FormLabel>
                  <Input
                    type="link"
                    name="webhook"
                    placeholder="Discord webhook?"
                    borderRadius="xl"
                    onChange={handleWebhook}
                    isInvalid={webhookError}
                    value={webhook}
                  />
                  <FormHelperText>
                    Leave it empty, if u don't wanna add webhook
                  </FormHelperText>
                </FormControl>
              </CardBody>
            </Card>
            <Card borderRadius="xl">
              <CardBody>
                <Flex>
                  <Button colorScheme="red" onClick={onOpen}>
                    Delete
                  </Button>
                  <Spacer />
                  <Button
                    colorScheme="green"
                    onClick={update}
                    isLoading={loading}
                    isDisabled={nameError || urlError || webhookError}
                  >
                    Update
                  </Button>
                </Flex>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay backdropFilter="blur(10px)" />
                  <ModalContent borderRadius="xl">
                    <ModalHeader>Confirm</ModalHeader>
                    <ModalCloseButton borderRadius="xl" />
                    <Divider />
                    <ModalBody>
                      Do you really want to delete <b>{data.key}</b>{' '}
                      monitor ?
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                      <Button colorScheme="green" onClick={onClose}>
                        No
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={deleteMonitor}
                        ml={3}
                        isLoading={delLoading}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </CardBody>
            </Card>
          </VStack>
        ) : (
          <AbsoluteCenter>
            <Spinner size="xl" />
          </AbsoluteCenter>
        )}
      </Container>
    </>
  );
}
