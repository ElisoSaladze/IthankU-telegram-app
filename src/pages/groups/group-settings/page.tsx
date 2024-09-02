import { Typography, Stack } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import NavigationItem from 'src/components/navigation-item';
import { paths } from '~/app/routes';
import { AppHeader } from '~/components/header';

export const GroupSettings = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppHeader backPath={paths.groups} />

      <Stack mx={3} alignItems="center">
        <Typography variant="h6" gutterBottom>
          Group Settings
        </Typography>
        <NavigationItem onClick={() => navigate(paths.groupSettingsFollowings)} name="Following" />
        <NavigationItem name="Invitation" onClick={() => navigate(paths.groupSettingsInvitations)} />
      </Stack>
    </>
  );
};
