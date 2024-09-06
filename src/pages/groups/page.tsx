import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Skeleton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { getUserGroups } from '~/api/groups';
import GroupItem from 'src/components/group-item';
import settingsIcon from 'src/assets/icons/settings.svg';
import { qk } from 'src/api/query-keys';
import { paths } from '~/app/routes';
import { CreatePostGroupMenu } from '~/components/create-post-group-menu';
import { AppHeader } from '~/components/header';
import { useAuthUser } from '~/app/auth';

export const GroupsPage = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: qk.groups.getUserGroups.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserGroups({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  return (
    <>
      <AppHeader pageName="Groups" />
      <Stack mx={3} pb={2}>
        <Stack mt={2} justifyContent="space-between" alignItems="center" direction="row">
          <CreatePostGroupMenu
            button={
              <Button size="medium" variant="contained" endIcon={<AddIcon />}>
                Create
              </Button>
            }
          />

          <IconButton onClick={() => navigate(paths.groupSettings)}>
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
          <Stack marginY={1} gap={1} marginBottom={10}>
            {data?.data.map((group, i) => <GroupItem key={i} group={group} />)}
          </Stack>
        )}
      </Stack>
    </>
  );
};
