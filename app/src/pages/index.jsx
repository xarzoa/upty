import Head from 'next/head';
import Status from '@components/status';
import SettingsIcon from '@components/icons/settingsIcon';
import ClockIcon from '@components/icons/clockIcon';
import ShareIcon from '@components/icons/shareIcon';
import ArrowPath from '@components/icons/arrowPath';
import {
  Container,
  VStack,
  Heading,
  Button,
  Card,
  CardBody,
  Box,
  IconButton,
  Spinner,
  Flex,
  Spacer,
  HStack,
  useToast,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Index() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/getStatus', fetcher);
  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Upty - The status page for Detonions.</title>
        <meta name="description" content="The status page for Detonions." />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable='no'"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`min-h-screen w-screen ${
          secure ? '' : 'grid place-items-center'
        }`}
      >
        {!isLoading ? (
          <Container centerContent="true" maxH="100%" p={4}>
            <VStack spacing={2} align="stretch" w="100%">
              <Alert status="info">
                <AlertIcon />
                Don't share this page with anyone.
              </Alert>
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <HStack>
                  <IconButton
                    colorScheme="gray"
                    aria-label="Home"
                    size="lg"
                    bg="gray.700"
                    p={1}
                    borderRadius="xl"
                    shadow="lg"
                    icon={<SettingsIcon />}
                    onClick={() => router.push('/dashboard')}
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
                </HStack>
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
              {data.status[0] ? (
                data.status.map((status, i) => (
                  <Status status={status} key={i} />
                ))
              ) : (
                <Card borderRadius="xl">
                  <CardBody>
                    <Container centerContent="true">
                      <Heading size="md">No monitors.</Heading>
                      <Box pt={2}>
                        <Button
                          colorScheme="green"
                          borderRadius="xl"
                          onClick={() => router.push('/dashboard')}
                        >
                          Add something to monitor
                        </Button>
                      </Box>
                    </Container>
                  </CardBody>
                </Card>
              )}
            </VStack>
          </Container>
        ) : (
          <div className="min-h-screen min-w-screen grid place-items-center">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </>
  );
}
