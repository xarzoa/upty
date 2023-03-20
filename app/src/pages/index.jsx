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
} from '@chakra-ui/react';

export default function Index() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/getStatus', fetcher, {
    refreshInterval: 1000,
  });
  const headData = {
    title: 'Upty - A personal uptime monitor',
    description: 'Uptime monitor for Detonions',
    favicon: '/favicon.ico',
  };

  return (
    <>
      <Head data={headData} />
      <Container centerContent="true" minH="100vh" p={4}>
        {!isLoading ? (
          <VStack spacing={2} align="stretch" w="100%">
            <Header />
            {data.status[0] ? (
              data.status.map((status, i) => <Status status={status} key={i} />)
            ) : (
              <Card borderRadius="xl">
                <CardBody>
                  <Container centerContent="true">
                    <Heading size="md">No monitors.</Heading>
                    <Box pt={2}>
                      <Button
                        onClick={() => router.push('/dashboard')}
                        colorScheme="green"
                      >
                        Add URL
                      </Button>
                    </Box>
                  </Container>
                </CardBody>
              </Card>
            )}
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
