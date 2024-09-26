import { Providers } from './providers';
import { AuthSwitch } from './app/auth-switch';
import { Box, Typography } from '@mui/material';
import { useNetworkStatus } from './lib/hooks';

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  // Ensure the SDK script has been loaded

  const { isOnline } = useNetworkStatus();

  if (!isOnline) {
    return (
      <Box width={1} height={1} p={3}>
        <Typography>You are offline, please check your internet connection!</Typography>
      </Box>
    );
  }

  if (!app) {
    console.error('TelegramWebApp is not available.');

    return (
      <Box width={1} height={1} p={3}>
        <Typography>Telegram Web App Is not available</Typography>
      </Box>
    );
  }

  app.ready();
  app.expand();
  app.disableVerticalSwipes();
  app.enableClosingConfirmation();

  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};
