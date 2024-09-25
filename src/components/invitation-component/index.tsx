import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import ShadeComponent from '../shade-component';
import { useMutation } from '@tanstack/react-query';
import { InvitationGroup, InvitationRespondStatus, respondInvitation } from '~/api/groups';

type InvitationItemProps = {
  group: InvitationGroup;
  refetch: () => void;
  id: string;
};

const InvitationItem: React.FC<InvitationItemProps> = ({ group, refetch, id }) => {
  const $respond = useMutation({
    mutationFn: respondInvitation,
  });

  const onRespond = (status: InvitationRespondStatus) => {
    $respond.mutate(
      {
        inviteId: id,
        status,
      },
      {
        onSuccess: refetch,
      },
    );
  };

  return (
    <Stack
      gap={1}
      alignItems="center"
      direction="row"
      sx={{
        width: 1,
        borderRadius: 5,
        padding: 1,
        boxShadow: '0px 0px 8.2px -1px #00000026',
      }}
    >
      <Box>
        <Avatar sx={{ width: 70, height: 70, borderRadius: 4 }} variant="rounded" src={group.picture ?? ''} />
      </Box>
      <Stack gap={0.5} width={1}>
        <Typography>{group.name}</Typography>

        {group.shade && <ShadeComponent color={group.shade.color} name={group.shade.en} />}
        <Box display="flex" gap={1}>
          <Button
            onClick={() => {
              onRespond('ACCEPTED');
            }}
            fullWidth
            variant="contained"
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              onRespond('DECLINED');
            }}
            fullWidth
            variant="contained"
            color="secondary"
          >
            Decline
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default InvitationItem;
