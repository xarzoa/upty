import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Button,
  Divider,
  IconButton,
  useDisclosure,
  Tooltip,
  AbsoluteCenter,
  Spinner,
  Alert,
  AlertIcon,
  SkeletonText,
} from '@chakra-ui/react';
import ClockIcon from '@components/icons/clock';
import HistoryWrap from '@components/historyWrapper'
import useSWR from 'swr';

export default function History() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data,
    error: fetchError,
    isLoading,
  } = useSWR('/api/getHistory', fetcher, { refreshInterval: 1000 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading)
    return (
      <>
        <>
          <Tooltip
            hasArrow
            label="Down history"
            bg="white"
            closeDelay={1500}
            borderRadius="xl"
          >
            <IconButton
              size="lg"
              p={1}
              bg="gray.700"
              icon={<ClockIcon />}
              onClick={onOpen}
            />
          </Tooltip>
          <Modal isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent borderRadius="xl">
            <ModalCloseButton borderRadius="xl"/>
              <ModalBody>
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      </>
    );

  if (data)
    return (
      <>
        <Tooltip
          hasArrow
          label="Down history"
          bg="white"
          closeDelay={1500}
          borderRadius="xl"
        >
          <IconButton
            size="lg"
            p={1}
            bg="gray.700"
            icon={<ClockIcon />}
            onClick={onOpen}
          />
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent borderRadius="xl">
          <ModalHeader>History</ModalHeader>
          <ModalCloseButton borderRadius="xl"/>
            <ModalBody>
              {data[0] ? (
                data.map((monitor, key) => (
                  <HistoryWrap data={monitor} key={key}/>
                ))
              ) : (
                <Alert status="info" my={3} borderRadius="xl">
                  <AlertIcon />
                  No monitors
                </Alert>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
}
