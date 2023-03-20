import Head from '@components/head';
import Header from '@components/header';
import AddMonitor from '@components/addMonitor';
import Monitor from '@components/monitor';
import {
  AbsoluteCenter,
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
  useDisclosure,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export default function Dashboard() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data,
    error: fetchError,
    isLoading,
  } = useSWR('/api/getMonitors', fetcher, { refreshInterval: 1000 });
  const { onOpen } = useDisclosure();

  const headData = {
    title: 'Upty - Dashboard',
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
            {data.monitors[0] ? (
              data.monitors.map((monitor, i) => (
                <Monitor monitor={monitor} key={i} />
              ))
            ) : (
              <Card borderRadius="xl">
                <CardBody>
                  <Container centerContent="true">
                    <Heading size="md">No monitors.</Heading>
                    <Box pt={2} textAlign="center">
                      To add monitor click green button with plus icon in right
                      up corner.
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
