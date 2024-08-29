import { Box, Typography, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import InvitationItem from 'src/components/invitation-component';
import { getInvitations } from '~/api/groups';
import { qk } from 'src/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { Progress } from '~/components/progress';

const Invitation = () => {
  const authUser = useAuthUser();

  const userId = authUser?.user._id || '';

  const {
    data: invitations,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: qk.groups.getInvitations.toKeyWithArgs({ userId }),
    queryFn: () => getInvitations({ userId }),
  });

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

  return (
    <Stack alignItems={'center'} p={2}>
      <Typography variant="h6" gutterBottom>
        Invitation
      </Typography>

      {invitations?.data.length > 0 ? (
        invitations!.data.map((invitation) => (
          <InvitationItem id={invitation._id} refetch={refetch} key={invitation._id} group={invitation.group} />
        ))
      ) : (
        <Typography>You do not have any invitation</Typography>
      )}
    </Stack>
  );
};

export default Invitation;
