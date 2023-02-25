import Head from 'next/head';
import Status from '@components/status';
import SettingsIcon from '@components/icons/settingsIcon';
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
} from '@chakra-ui/react';
import useSWR from 'swr';

export default function StatusPage() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/getStatus', fetcher);

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
      <div className="min-h-screen w-screen grid place-items-center">
        {!isLoading ? (
          <Container centerContent="true" maxH="100%" p={4}>
            <VStack spacing={2} align="stretch" w="100%">
              {data.status[0] ? (
                data.status.map((status, i) => (
                  <Status status={status} key={i} />
                ))
              ) : (
                <Card borderRadius="xl">
                  <CardBody>
                    <Container centerContent="true">
                      <Heading size="md">No monitors.</Heading>
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
