import { Avatar, Box, Button, Dialog, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';
import { getGroupMembers, removeUserFromGroup } from '~/api/groups';
import { qk } from '~/api/query-keys';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useBoolean } from '~/lib/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { generatePath, useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';
import { useAuthUser } from '~/app/auth';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  groupId: string;
  owner: string;
};

export const GroupUsers = ({ groupId, owner }: Props) => {
  const [ref, inView] = useInView();
  const authUser = useAuthUser();
  const isOwner = owner === authUser?.user.id;

  const navigate = useNavigate();

  const $groupUsers = useInfiniteQuery({
    queryKey: qk.groups.members.toKeyWithArgs({ groupId }),
    queryFn: async ({ pageParam = 1 }) => getGroupMembers({ groupId, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });

  const $deleteUser = useMutation({
    mutationFn: (userId: string) => removeUserFromGroup(groupId, userId),
    onSuccess: $groupUsers.refetch,
  });

  const isUsersDialogOpen = useBoolean();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  if (isUsersDialogOpen.isTrue) {
    app.BackButton.show();
    app.BackButton.onClick(() => isUsersDialogOpen.setFalse());
  } else {
    app.BackButton.hide();
  }

  useEffect(() => {
    if (inView && $groupUsers.hasNextPage) {
      $groupUsers.fetchNextPage();
    }
  }, [$groupUsers, inView]);

  return match($groupUsers)
    .with({ isLoading: true }, () => <Skeleton variant="circular" width={32} height={32} />)
    .with({ isSuccess: true, data: P.select() }, ({ pages }) => {
      const users = pages.flatMap((page) => page.data);
      const firstPageUsers = pages[0]?.data || [];

      return (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Stack direction="row" spacing={-2}>
              {firstPageUsers.map((user) => (
                <Avatar
                  key={user.id}
                  alt={`user ${user.name}`}
                  src={user.picture ?? ''}
                  sx={{ width: 32, height: 32 }}
                />
              ))}
            </Stack>
            <IconButton onClick={isUsersDialogOpen.setTrue}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
          <Dialog open={isUsersDialogOpen.isTrue} onClose={isUsersDialogOpen.setFalse} fullScreen>
            <Stack width={1} spacing={2} sx={{ padding: 2 }}>
              <Typography variant="h6">Group Members</Typography>
              <Stack width={1} spacing={1}>
                {users.map((user) => (
                  <Box
                    width={1}
                    key={user.id}
                    sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box
                      onClick={() => {
                        navigate(generatePath(paths.userDetails, { userId: user.id ?? '' }), {
                          state: { backPath: location.pathname },
                        });
                      }}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <Avatar alt={`user ${user.name}`} src={user.picture ?? ''} />
                      <Typography>{user.name}</Typography>
                    </Box>
                    {isOwner && owner !== user.id && (
                      <Button onClick={() => $deleteUser.mutate(user.id)} startIcon={<DeleteIcon />}>
                        Remove
                      </Button>
                    )}
                  </Box>
                ))}
                {$groupUsers.hasNextPage && (
                  <Button
                    disabled={!$groupUsers.hasNextPage || $groupUsers.isFetchingNextPage}
                    ref={ref}
                    onClick={() => $groupUsers.fetchNextPage()}
                  >
                    {$groupUsers.isFetchingNextPage
                      ? 'Loading more posts'
                      : $groupUsers.hasNextPage
                        ? 'Show more'
                        : 'No more posts'}
                  </Button>
                )}
              </Stack>
            </Stack>
          </Dialog>
        </>
      );
    })
    .run();
};
