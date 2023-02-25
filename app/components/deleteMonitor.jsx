import {
  Container,
  Flex,
  VStack,
  HStack,
  Box,
  Card,
  CardBody,
  Heading,
  Tag,
  Wrap,
  WrapItem,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Delete({ url }) {
  const [dloading, setDLoading] = useState();
  const toast = useToast();

  const deleteUrl = async (e) => {
    setDLoading(true);
    const res = await fetch('/api/deleteMonitor', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: url.key }),
    });
    toast({
      title: 'Deleted',
      description: `${url.key} monitor deleted.`,
      status: 'success',
      position: 'bottom-left',
      isClosable: true,
    });
    setDLoading(false);
  };
  return (
    <VStack align="stretch">
      <Card borderRadius="xl">
        <CardBody>
          <Heading size="sm">{url.name}</Heading>
          <HStack pt={2}>
            <Wrap>
              <WrapItem>
                <Tag>{url.string}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag>{url.key}</Tag>
              </WrapItem>
            </Wrap>
          </HStack>
          <Box pt={4}>
            <Button
              colorScheme="red"
              loadingText="Deleting ..."
              borderRadius="xl"
              onClick={deleteUrl}
              isLoading={dloading}
            >
              Delete
            </Button>
          </Box>
        </CardBody>
      </Card>
    </VStack>
  );
}
