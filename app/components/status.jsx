import CheckIcon from '@components/icons/check';
import XCircleIcon from '@components/icons/xCircle';
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
  WrapItem
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
            { isAvailable ? (
              <Box color="green.300">
                <CheckIcon />
              </Box>
            ) : (
              <Box color="red.300">
                <XCircleIcon />
              </Box>
            )}
            <Heading size="md">{status.name}</Heading>
          </HStack>
          <HStack pt={4}>
            <Wrap>
              <WrapItem>
                <Tag>{status.url}</Tag>
              </WrapItem>
              {status.checked_method ? (
                <WrapItem>
                  <Tag>{status.checked_method}</Tag>
                </WrapItem>
              ) : (
                ''
              )}
              <WrapItem>
                <Tag colorScheme="blue">
                  {status.res_time ? status.res_time : 'Not counted'}ms
                </Tag>
              </WrapItem>
              {status.code ? (
                <WrapItem>
                  <Tag colorScheme={isAvailable ? 'green' : 'red'}>
                    {status.code}
                  </Tag>
                </WrapItem>
              ) : (
                ''
              )}
              {status.message ? (
                <WrapItem>
                  <Tag colorScheme={isAvailable ? 'green' : 'red'}>
                    {status.message}
                  </Tag>
                </WrapItem>
              ) : (
                ''
              )}
              {status.encrypted_socket ? (
                <WrapItem>
                  <Tag colorScheme={status.encrypted_socket ? 'green' : 'red'}>
                    {status.encrypted_socket
                      ? 'Encrypted socket'
                      : 'Unencrypted socket'}
                  </Tag>
                </WrapItem>
              ) : (
                ''
              )}
              {status.protocol ? (
                <WrapItem>
                  <Tag
                    colorScheme={
                      status.protocol === 'HTTPS' ? 'green' : 'yellow'
                    }
                  >
                    {status.protocol}
                  </Tag>
                </WrapItem>
              ) : (
                ''
              )}
              {status.server ? (
                <WrapItem>
                  <Tag>{status.server}</Tag>
                </WrapItem>
              ) : (
                ''
              )}
              {status.last_checked ? (
                <WrapItem>
                  <Tag>Last checked at {lastChecked}</Tag>
                </WrapItem>
              ) : (
                ''
              )}
            </Wrap>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
