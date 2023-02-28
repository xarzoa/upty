import Head from 'next/head';
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
  Tag
} from '@chakra-ui/react';

export default function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Upty - Error</title>
        <meta
          name="description"
          content={`The status page for Detonions but with error code ${statusCode}`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable='no'"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-screen grid place-items-center">
        <Card borderRadius="xl">
          <CardBody>
            <Container centerContent="true">
              <Heading size="md">{statusCode}</Heading>
              <Tag colorScheme={statusCode < 399 ? 'green' : 'red' } mt={4}>Recived {statusCode}.</Tag>
            </Container>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}
