import AddIcon from '@mui/icons-material/Add';
import { Box, Button, IconButton, Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getUserSpaces } from '~/api/spaces';
import SpaceItem from 'src/components/space-item';
import settingsIcon from 'src/assets/icons/settings.svg';
import { qk } from 'src/api/query-keys';
import { paths } from '~/app/routes';
import { CreatePostSpaceMenu } from '~/components/create-post-space-menu';
import { AppHeader } from '~/components/header';
import { useAuthUser } from '~/app/auth';

export const SpacesPage = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: qk.spaces.getUserSpaces.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserSpaces({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  return (
    <Box position="relative">
      <AppHeader
        pageName="Spaces"
        headerSx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      />
      <Stack mx={3} pb={2}>
        <Stack mt={2} justifyContent="space-between" alignItems="center" direction="row">
          <CreatePostSpaceMenu
            button={
              <Button size="medium" variant="contained" endIcon={<AddIcon />}>
                Create
              </Button>
            }
            fromSpacePage
          />

          <IconButton onClick={() => navigate(paths.spaceSettings)}>
            <img src={settingsIcon} />
          </IconButton>
        </Stack>
        {isLoading ? (
          <Stack marginY={1} gap={1}>
            {[...Array(5)].map((_, index) => (
              <Skeleton sx={{ borderRadius: 5 }} key={index} variant="rectangular" height={80} />
            ))}
          </Stack>
        ) : (
          <Stack marginY={1} gap={2}>
            {data?.data.map((space, i) => <SpaceItem key={i} space={space} />)}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
