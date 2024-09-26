import { Typography, Stack, Box, Divider } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import NavigationItem from 'src/components/navigation-item';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';

export const SpaceSettings = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppHeader backPath={paths.home} />
      <Stack m={3} mt={0} alignItems="center">
        <Typography fontSize={24}>Space Settings</Typography>
        <Box
          sx={{
            width: 1,
            mt: 3,
            p: 2,
            borderRadius: 8,
            border: 1,
            borderColor: '#EFEFEF',
          }}
        >
          <Box sx={{ pb: 1 }}>
            <NavigationItem onClick={() => navigate(paths.spaceSettingsFollowings)} name="Following" />
          </Box>
          <Divider />
          <Box sx={{ pt: 1 }}>
            <NavigationItem name="Invitation" onClick={() => navigate(paths.spaceSettingsInvitations)} />
          </Box>
        </Box>
      </Stack>
    </>
  );
};
