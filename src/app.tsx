import './styles/app.css';
import { Providers } from './providers';
import { AuthSwitch } from './app/auth-switch';
import { Box, Typography } from '@mui/material';

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  // Ensure the SDK script has been loaded

  if (!app) {
    console.error('TelegramWebApp is not available.');

    return (
      <Providers>
        <Box width={1} height={1} p={3}>
          <Typography>Telegram Web App Is not available</Typography>
        </Box>
      </Providers>
    );
  }

  app.ready();
  app.expand();
  app.disableVerticalSwipes();

  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};
