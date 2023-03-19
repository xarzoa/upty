import {
  VStack,
  HStack,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Tag,
  Wrap,
  WrapItem,
  IconButton,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PencilIcon from '@components/icons/pencil';

export default function Monitors({ monitor }) {
  const router = useRouter();
  return (
    <VStack align="stretch">
      <Card borderRadius="xl" direction={{ base: 'column', sm: 'row' }}>
        <CardBody>
          <Heading size="sm">{monitor.name}</Heading>
          <HStack pt={2}>
            <Wrap>
              <WrapItem>
                <Tag>{monitor.url}</Tag>
              </WrapItem>
            </Wrap>
          </HStack>
        </CardBody>
        <CardFooter>
          <Flex align="center" justify="center">
            <Tooltip
              hasArrow
              label="Edit monitor"
              bg="white"
              closeDelay={1500}
              borderRadius="xl"
              placement="left"
            >
              <IconButton
                colorScheme="green"
                onClick={() => router.push(`/dashboard/monitor/${monitor.key}`)}
                size="lg"
                p={1}
                icon={<PencilIcon />}
              />
            </Tooltip>
          </Flex>
        </CardFooter>
      </Card>
    </VStack>
  );
}
