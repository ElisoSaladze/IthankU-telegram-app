import { AppBar, Box, Button, IconButton, Stack, Typography } from '@mui/material';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCreateGroupContext, CreateGroupProvider } from 'src/providers/create-group-provider';
import { paths } from '~/app/routes';
import { IconArrow } from '~/assets/icons';

const CreateGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleSubmit } = useCreateGroupContext();

  const activePath = location.pathname.split('/')[2];

  const navigateToNextStep = () => {
    if (activePath === 'details') {
      navigate(paths.createGroupInterests);
    } else if (activePath === 'group-interests') {
      navigate(paths.createGroupFinal);
    }
  };

  const color = activePath === 'details' ? 'white' : 'black';

  return (
    <Stack position="relative" px={3} pb={3}>
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
          <IconButton
            onClick={() => {
              if (activePath === 'details') {
                navigate(paths.home);
                return;
              }

              navigate(-1);
            }}
            sx={{
              position: 'absolute',
              left: 0,
            }}
          >
            <IconArrow direction="left" sx={{ fontSize: 15, color }} />
          </IconButton>
          <Typography fontSize={20} fontWeight={500} color={color} textAlign="center">
            Create Group
          </Typography>
        </Box>
      </AppBar>

      <Outlet />

      {activePath !== 'final' && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 8,
          }}
          onClick={handleSubmit(navigateToNextStep)}
        >
          Next
        </Button>
      )}
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
