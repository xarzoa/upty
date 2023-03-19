import SettingsIcon from '@components/icons/settings';
import ClockIcon from '@components/icons/clock';
import ShareIcon from '@components/icons/share';
import ArrowPathIcon from '@components/icons/arrowPath';
import LeftArrowIcon from '@components/icons/leftArrow';
import AddMonitor from '@components/addMonitor';
import Help from '@components/help';
import { useRouter } from 'next/router';
import {
  Flex,
  HStack,
  IconButton,
  Spacer,
  Alert,
  AlertIcon,
  useToast,
  Button,
  Tooltip
} from '@chakra-ui/react';

export default function Header() {
  const router = useRouter();
  const toast = useToast();

  const dest = router.pathname;

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <HStack>
          <Tooltip
            hasArrow
            label={dest === '/' ? 'Settings' : 'Go back'}
            bg="white"
            closeDelay={1500}
            borderRadius="xl"
            placement="right"
          >
            <IconButton
              size="lg"
              bg="gray.700"
              p={1}
              icon={dest === '/' ? <SettingsIcon /> : <LeftArrowIcon />}
              onClick={() =>
                router.push(
                  dest === '/'
                    ? '/dashboard'
                    : dest.includes('/monitor')
                    ? '/dashboard'
                    : '/'
                )
              }
            />
          </Tooltip>
          {dest.includes('/monitor') ? (
            ''
          ) : (
            <Tooltip
              hasArrow
              label="Refresh page"
              bg="white"
              closeDelay={1500}
              borderRadius="xl"
            >
              <IconButton
                size="lg"
                bg="gray.700"
                p={1}
                icon={<ArrowPathIcon />}
                onClick={() => router.push(dest)}
              />
            </Tooltip>
          )}
        </HStack>
        <Spacer />
        <HStack>
          {dest.includes('/monitor') ? (
            ''
          ) : (
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
                onClick={() =>
                  toast({
                    title: 'Info',
                    description: 'Not available!',
                    status: 'success',
                    position: 'bottom-left',
                    isClosable: true,
                  })
                }
              />
            </Tooltip>
          )}
          <Help dest={dest} />
          {dest === '/dashboard' ? <AddMonitor /> : ''}
        </HStack>
      </Flex>
    </>
  );
}
