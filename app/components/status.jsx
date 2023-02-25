import CheckIcon from '@components/icons/checkIcon';
import XCircleIcon from '@components/icons/xCircleIcon';
import {
  Container,
  VStack,
  HStack,
  Box,
  Card,
  CardBody,
  Heading,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

export default function Status({ status }) {
  const date = new Date(status.last_checked);
  const lastChecked = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  const isAvailable = status.code < 399;

  return (
    <VStack align="stretch">
      <Card borderRadius="xl">
        <CardBody>
          <HStack>
            {isAvailable ? (
              <Box color="green.400">
                <CheckIcon />
              </Box>
            ) : (
              <Box color="red.400">
                <XCircleIcon />
              </Box>
            )}
            <Heading size="md">{status.name}</Heading>
          </HStack>
          <HStack pt={4}>
            <Wrap>
              <WrapItem>
                <Tag>{status.string}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag>
                  {status.checked_method}
                </Tag>
              </WrapItem>
              <WrapItem colorScheme="info">
                <Tag>
                  {status.res_time}ms
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={isAvailable ? 'green' : 'red'}>
                  {status.code}
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={isAvailable ? 'green' : 'red'}>
                  {status.message}
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={status.encrypted_socket ? 'green' : 'red'}>
                  {status.encrypted_socket ? "Encrypted socket" : "Unencrypted socket" }
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={(status.protocol === 'HTTPS') ? 'green' : 'yellow'}>
                  {status.protocol}
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag>
                  {status.server}
                </Tag>
              </WrapItem>
              <WrapItem>
                <Tag>Last checked at {lastChecked}</Tag>
              </WrapItem>
            </Wrap>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
