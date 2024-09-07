import { AppBar, Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CreateGroupProvider } from 'src/providers/create-group-provider';
import { paths } from '~/app/routes';

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram!.WebApp;
    app.BackButton.show();

    const handleBackButtonClick = () => {
      const currentPath = location.pathname.split('/')[2];

      if (currentPath === 'details') {
        navigate(paths.home);
      } else {
        navigate(-1);
      }
    };

    app.BackButton.onClick(handleBackButtonClick);

    // Cleanup function to remove the event listener on unmount or when the component re-renders
    return () => {
      app.BackButton.offClick(handleBackButtonClick);
    };
  }, [location.pathname, navigate]);

  const activePath = location.pathname.split('/')[2];
  const color = activePath === 'details' ? 'white' : 'black';

  return (
    <Stack position="relative" px={3} pb={3} height={1}>
      <AppBar
        sx={{
          position: 'fixed',
          bgcolor: 'transparent',
          top: 20,
          px: 3,
          pl: 2,
        }}
      >
        <Box position="relative">
          <Typography fontSize={20} fontWeight={500} color={color} textAlign="center">
            Create Group
          </Typography>
        </Box>
      </AppBar>

      <Outlet />
    </Stack>
  );
};

export const CreateGroupPage = () => {
  return (
    <CreateGroupProvider>
      <CreateGroup />
    </CreateGroupProvider>
  );
};
