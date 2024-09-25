import React from 'react';
import { Box, Typography, Avatar, Button, Stack, Chip } from '@mui/material';
import ShadeComponent from '../shade-component';
import { useMutation } from '@tanstack/react-query';
import { InvitationGroup, InvitationStatus, respondIntivation } from '~/api/groups';

type InvitationItemProps = {
  group: InvitationGroup;
  refetch: () => void;
  invitationId: string;
  invitationStatus: InvitationStatus;
};

const InvitationItem: React.FC<InvitationItemProps> = ({ group, refetch, invitationId, invitationStatus }) => {
  const $respond = useMutation({
    mutationFn: respondIntivation,
  });

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
      <Stack gap={0.5} width={'100%'}>
        <Typography>{group.name}</Typography>

        {group.shade && <ShadeComponent color={group.shade.color} name={group.shade.en} />}
        {invitationStatus === 'PENDING' ? (
          <Box display={'flex'} gap={1}>
            <Button
              onClick={() =>
                $respond.mutate(
                  {
                    inviteId: invitationId,
                    status: 'ACCEPTED',
                  },
                  {
                    onSuccess: () => {
                      refetch();
                    },
                  },
                )
              }
              fullWidth
              variant="contained"
            >
              Accept
            </Button>
            <Button
              onClick={() =>
                $respond.mutate(
                  {
                    inviteId: invitationId,
                    status: 'DECLINED',
                  },
                  {
                    onSuccess: () => {
                      refetch();
                    },
                  },
                )
              }
              fullWidth
              variant="contained"
              color="secondary"
            >
              Decline
            </Button>
          </Box>
        ) : (
          <Chip label="Declined" color="error" sx={{ width: 100 }} />
        )}
      </Stack>
    </Stack>
  );
};

export default InvitationItem;
