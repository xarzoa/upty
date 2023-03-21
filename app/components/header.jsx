import SettingsIcon from '@components/icons/settings';
import ClockIcon from '@components/icons/clock';
import ShareIcon from '@components/icons/share';
import LeftArrowIcon from '@components/icons/leftArrow';
import AddMonitor from '@components/addMonitor';
import Help from '@components/help';
import History from '@components/history'
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
        </HStack>
        <Spacer />
        <HStack>
          {dest.includes('/monitor') ? (
            ''
          ) : (
            <History/>
          )}
          <Help dest={dest} />
          {dest === '/dashboard' ? <AddMonitor /> : ''}
        </HStack>
      </Flex>
    </>
  );
}
