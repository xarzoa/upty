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

export default function Hisoty({ data }) {
  function dhm(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    if (days !== 0) {
      return (
        days + ' days ' + hours + ' hours ' + minutes + ' mins ' + sec + ' secs'
      );
    } else if (hours !== 0) {
      return hours + ' hours ' + minutes + ' mins ' + sec + ' secs';
    } else if (minutes !== 0) {
      return minutes + ' mins ' + sec + ' secs';
    } else {
      return sec + ' secs';
    }
  }

  function localDT(date) {
    const toDate = new Date(date);
    return `${toDate.toLocaleDateString()} ${toDate.toLocaleTimeString()}`;
  }

  return (
    <VStack align="stretch">
      <Card borderRadius="xl" variant="outline" mb="3">
        <CardBody>
          <HStack>
            { data.down ? (
              <Box color="red.300">
              <XCircleIcon />
            </Box>
            ) : (
              <Box color="green.300">
                <CheckIcon />
              </Box>
            )}
            <Heading size="md">{data.name} is { data.down ? 'down' : 'up'}.</Heading>
          </HStack>
          <HStack pt={4}>
            <Wrap>
              <WrapItem>
                <Tag>{data.url}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={ data.down ? 'red' : 'green'}>{ data.down ? 'Down' : 'Up'} for {dhm(data.for)}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme="blue">Since {localDT(data.since)}</Tag>
              </WrapItem>
              <WrapItem>
                <Tag colorScheme={ data.down ? 'red' : 'green'}>Returned {data.incident}</Tag>
              </WrapItem>
            </Wrap>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
