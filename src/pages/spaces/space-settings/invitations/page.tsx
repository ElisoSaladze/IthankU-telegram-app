import { Box, Typography, Stack, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InvitationItem from 'src/components/invitation-component';
import { getInvitations } from '~/api/spaces';
import { qk } from 'src/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { AppHeader } from '~/components/header';
import { paths } from '~/app/routes';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { ErrorView } from '~/components/error-view';
import { Progress } from '~/components/progress';

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
    queryKey: qk.spaces.getInvitations.toKeyWithArgs({ userId }),
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
        <Progress centered />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <ErrorView message="Failed to fetch invitations" />
      </Box>
    );
  }

  const flattenedInvitations = invitations?.pages.flatMap((page) => page.data) || [];

  return (
    <>
      <AppHeader backPath={paths.spaceSettings} />
      <Stack alignItems={'center'} px={2}>
        <Typography variant="h6" gutterBottom>
          Invitations
        </Typography>

        <Stack spacing={1} width={1}>
          {flattenedInvitations.length > 0 ? (
            flattenedInvitations.map((invitation) => (
              <InvitationItem
                key={invitation.id}
                invitationId={invitation.id}
                invitationStatus={invitation.status}
                space={invitation.space}
                refetch={refetch}
              />
            ))
          ) : (
            <Typography>You do not have any invitations</Typography>
          )}
        </Stack>

        {hasNextPage && (
          <Button disabled={!hasNextPage || isFetchingNextPage} ref={ref} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Loading more invitations' : hasNextPage ? 'Show more' : 'No more invitations'}
          </Button>
        )}
      </Stack>
    </>
  );
};
