import { Box, Typography, Stack, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InvitationItem from 'src/components/invitation-component';
import { getInvitations } from '~/api/groups';
import { qk } from 'src/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { Progress } from '~/components/progress';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const Invitation = () => {
  const authUser = useAuthUser();
  const [ref, inView] = useInView();
  const userId = authUser?.user.id || '';

  const {
    data: invitations,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: qk.groups.getInvitations.toKeyWithArgs({ userId }),
    queryFn: async ({ pageParam = 1 }) => getInvitations({ userId, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.page + 1;
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Progress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error: {'Failed to fetch invitations'}</Typography>
      </Box>
    );
  }

  const flattenedInvitations = invitations?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <AppHeader backPath={paths.groupSettings} />
      <Stack alignItems={'center'} px={2}>
        <Typography variant="h6" gutterBottom>
          Invitations
        </Typography>

        {flattenedInvitations.length > 0 ? (
          flattenedInvitations.map((invitation) => (
            <InvitationItem key={invitation.id} id={invitation.id} group={invitation.group} refetch={refetch} />
          ))
        ) : (
          <Typography>You do not have any invitations</Typography>
        )}

        {hasNextPage && (
          <Button disabled={!hasNextPage || isFetchingNextPage} ref={ref} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading more invitations' : hasNextPage ? 'Show more' : 'No more invitations'}
          </Button>
        )}
      </Stack>
    </>
  );
};
