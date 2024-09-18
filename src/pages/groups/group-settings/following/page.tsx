import { Typography, Stack, ListItemButton, Avatar, IconButton, Box, Skeleton } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';

import ShadeComponent from 'src/components/shade-component';
import TagItem from 'src/components/tag';
import defaultImageUrl from 'src/assets/images/itu-circle.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { getUserGroups, leaveGroup } from '~/api/groups';
import { qk } from '~/api/query-keys';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { useAuthUser } from '~/app/auth';
import { ErrorView } from '~/components/error-view';

export const Following = () => {
  const authUser = useAuthUser();

  const $groups = useQuery({
    queryKey: qk.groups.getUserGroups.toKeyWithArgs({ userId: authUser?.user.id ?? '' }),
    queryFn: () => getUserGroups({ userId: authUser?.user.id ?? '' }),
    enabled: authUser !== null,
  });

  const $leaveGroup = useMutation({
    mutationFn: leaveGroup,
  });

  return (
    <>
      <AppHeader backPath={paths.groupSettings} />

      <Stack px={3} pb={10} gap={1} alignItems="center">
        <Typography variant="h6" gutterBottom>
          Following
        </Typography>

        {match($groups)
          .with({ isLoading: true }, () => (
            <>
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
            </>
          ))
          .with({ isError: true }, () => <ErrorView message="Error loading groups." />)
          .with({ isSuccess: true, data: P.select() }, (groups) =>
            groups.data.map((group) => (
              <ListItemButton
                key={group.id}
                sx={{
                  width: '100%',
                  borderRadius: 5,
                  padding: 1,
                  boxShadow: '0px 0px 8.2px -1px #00000026',
                }}
              >
                <Stack sx={{ width: '100%' }} alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                  <Stack gap={2} alignItems="center" direction="row">
                    <Box paddingY={0.5} position={'relative'}>
                      <Avatar
                        sx={{ width: 70, height: 70, borderRadius: 4 }}
                        variant="rounded"
                        src={group.picture || defaultImageUrl}
                      />
                      <Avatar
                        sx={{
                          height: 35,
                          width: 35,
                          bgcolor: group.shade?.color,
                          position: 'absolute',
                          bottom: -5,
                          right: -10,
                        }}
                      >
                        <Typography fontWeight={600} fontSize={10} color="white">
                          {group.membersCount}
                        </Typography>
                      </Avatar>
                    </Box>
                    <Stack gap={0.5}>
                      <Typography fontSize={15} fontWeight={600}>
                        {group.name}
                      </Typography>
                      {group.shade && <ShadeComponent color={group.shade.color} name={group.shade.en} />}
                      <Stack direction="row">{group.tags?.map((tag, i) => <TagItem key={i} tag={tag} />)}</Stack>
                    </Stack>
                  </Stack>
                  <IconButton
                    onClick={() => {
                      $leaveGroup.mutate(
                        { groupId: group.id },
                        {
                          onSuccess: () => {
                            $groups.refetch();
                          },
                        },
                      );
                    }}
                  >
                    <LogoutIcon fontSize="large" />
                  </IconButton>
                </Stack>
              </ListItemButton>
            )),
          )
          .otherwise(() => (
            <>
              <Skeleton variant="rectangular" height={80} width={1} />
              <Skeleton variant="rectangular" height={80} width={1} />
            </>
          ))}
      </Stack>
    </>
  );
};
