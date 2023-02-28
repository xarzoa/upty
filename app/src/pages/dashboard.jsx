import Head from 'next/head';
import { useRouter } from 'next/router';
import LeftArrowIcon from '@components/icons/leftArrowIcon';
import ClockIcon from '@components/icons/clockIcon';
import ShareIcon from '@components/icons/shareIcon';
import ArrowPath from '@components/icons/arrowPath';
import {
  Input,
  Button,
  Box,
  Container,
  VStack,
  HStack,
  Card,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
  Alert,
  AlertIcon,
  Divider,
  IconButton,
  Spinner,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import Delete from '@components/deleteMonitor';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function Dashboard() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data,
    error: fetchError,
    isLoading,
  } = useSWR('/api/getUrls', fetcher);
  const [url, setUrl] = useState();
  const [name, setName] = useState();
  const [webhook, setWebhook] = useState();
  const [error, setError] = useState();
  const [whError, setWherror] = useState();
  const [uloading, setULoading] = useState();
  const [wloading, setWLoading] = useState();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setWebhook(data?.settings?.webhook);
    }
  }, [data]);

  const addUrl = async (e) => {
    setULoading(true);
    if (url && name) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const res = await fetch('/api/addMonitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name, url: url }),
        });
        toast({
          title: 'Success',
          description: 'Your url added and scheduled for testing.',
          status: 'success',
          position: 'bottom-left',
          isClosable: true,
        });
      } else {
        const res = await fetch('/api/addMonitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name, url: 'http://' + url }),
        });
        toast({
          title: 'Success but,',
          description: 'We added http:// for you.',
          status: 'success',
          position: 'bottom-left',
          isClosable: true,
        });
      }
      setUrl('');
      setName('');
      fetch('/__backend/__space/v0/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'hello',
      });
    } else {
      setError(true);
      toast({
        title: 'Error',
        description: 'All fields are required.',
        status: 'error',
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setULoading(false);
  };

  const addWebhook = async (e) => {
    setWLoading(true);
    if (webhook) {
      if (webhook.startsWith('https://discord.com/api/webhooks/')) {
        const res = await fetch('/api/updateSettings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: 'webhook', data: webhook }),
        });
        toast({
          title: 'Success',
          description: 'Your webhook added!',
          status: 'success',
          position: 'bottom-left',
          isClosable: true,
        });
      } else {
        setWherror(true);
        toast({
          title: 'Error',
          description: "Doesn't look like discord webhook!",
          status: 'success',
          position: 'bottom-left',
          isClosable: true,
        });
      }
    } else {
      setWherror(true);
      toast({
        title: 'Error',
        description: 'Webhook required.',
        status: 'error',
        position: 'bottom-left',
        isClosable: true,
      });
    }
    setWLoading(false);
  };

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleWebhook(e) {
    setWebhook(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Upty - Dashboard</title>
        <meta name="description" content="The status page for Detonions." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable='no'"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-screen">
        <Container centerContent="true" maxH="100%" p={4}>
          <VStack align="stretch" w="100%">
            <Alert status="info">
              <AlertIcon />
              Don't share this page with anyone.
            </Alert>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <IconButton
                colorScheme="gray"
                aria-label="Home"
                size="lg"
                bg="gray.700"
                p={1}
                borderRadius="xl"
                shadow="lg"
                icon={<LeftArrowIcon />}
                onClick={() => router.push('/')}
              />
              <IconButton
                colorScheme="gray"
                aria-label="Home"
                size="lg"
                bg="gray.700"
                p={1}
                borderRadius="xl"
                shadow="lg"
                icon={<ArrowPath />}
                onClick={() => router.reload()}
              />
              <Spacer />
              <HStack>
                <IconButton
                  colorScheme="gray"
                  aria-label="Home"
                  size="lg"
                  p={1}
                  bg="gray.700"
                  borderRadius="xl"
                  shadow="lg"
                  icon={<ClockIcon />}
                  onClick={() =>
                    toast({
                      title: 'Info',
                      description: 'History will available in soon..',
                      status: 'success',
                      position: 'bottom-left',
                      isClosable: true,
                    })
                  }
                />
              </HStack>
            </Flex>
            <Card borderRadius="xl">
              <CardBody>
                <Heading size="md">Add monitor</Heading>
                <FormControl pt={3}>
                  <FormLabel>Monitor name</FormLabel>
                  <Input
                    isInvalid={error}
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
                    isInvalid={error}
                    type="link"
                    name="url"
                    value={url}
                    onChange={handleUrl}
                    placeholder="URL?"
                    borderRadius="xl"
                  />
                  <FormHelperText>
                    Include http:// or https:// if you want.
                  </FormHelperText>
                </FormControl>
                <Box pt={4}>
                  <Button
                    loadingText="Adding ..."
                    onClick={addUrl}
                    borderRadius="xl"
                    isLoading={uloading}
                    colorScheme="green"
                  >
                    Add monitor
                  </Button>
                </Box>
              </CardBody>
            </Card>
            {isLoading ? (
              <div className="w-screen grid place-items-center">
                <Spinner pt={2} />
              </div>
            ) : (
              <>
                <Card borderRadius="xl">
                  <CardBody>
                    <Heading size="md">Settings</Heading>
                    <FormControl pt={3}>
                      <FormLabel>Discord webhook</FormLabel>
                      <Input
                        isInvalid={whError}
                        type="text"
                        name="webhook"
                        onChange={handleWebhook}
                        placeholder="Webhook?"
                        value={webhook}
                        borderRadius="xl"
                      />
                    </FormControl>
                    <Box pt={4}>
                      <Button
                        loadingText="Adding ..."
                        onClick={addWebhook}
                        borderRadius="xl"
                        isLoading={wloading}
                        colorScheme="green"
                      >
                        Add webhook
                      </Button>
                    </Box>
                  </CardBody>
                </Card>
                {data.urls.map((url, i) => (
                  <Delete url={url} key={i} />
                ))}
              </>
            )}
          </VStack>
        </Container>
      </div>
    </>
  );
}
