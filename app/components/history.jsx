import {
  Modal,
  ModalBody,
  ModalOverlay,
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
  AlertTitle,
  AlertDescription,
  SkeletonText,
} from '@chakra-ui/react';
import ClockIcon from '@components/icons/clock';
import useSWR from 'swr';

export default function History() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const {
    data,
    error: fetchError,
    isLoading,
  } = useSWR('/api/getHistory', fetcher, { refreshInterval: 1000 });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent borderRadius="xl">
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter="blur(10px)" />
          <ModalContent borderRadius="xl">
            <ModalBody>
              {data[0] ? (
                data.map((monitor, key) => (
                  <Alert
                    status={monitor.down ? 'error' : 'success'}
                    key={key}
                    my={3}
                    borderRadius="xl"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <AlertIcon />
                    <AlertTitle>
                      {monitor.name} is {monitor.down ? 'down' : 'up'}
                    </AlertTitle>
                    <AlertDescription>For {dhm(monitor.for)}</AlertDescription>{' '}
                    <AlertTitle>Since{localDT(monitor.since)}</AlertTitle>
                  </Alert>
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
