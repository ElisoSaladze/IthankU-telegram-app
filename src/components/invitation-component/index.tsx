import React from 'react';
import { Box, Typography, Avatar, Button, Stack } from '@mui/material';
import ShadeComponent from '../shade-component';
import { useMutation } from '@tanstack/react-query';
import { InvitationGroup, respondIntivation } from '~/api/groups';

type InvitationItemProps = {
  group: InvitationGroup;
  refetch: () => void;
  id: string;
};

const InvitationItem: React.FC<InvitationItemProps> = ({ group, refetch, id }) => {
  const $respond = useMutation({
    mutationFn: respondIntivation,
  });

  return (
    <Stack
      gap={1}
      alignItems={'center'}
      direction={'row'}
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
        <Box display={'flex'} gap={1}>
          <Button
            onClick={() =>
              $respond.mutate(
                {
                  inviteId: id,
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
                  inviteId: id,
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
      </Stack>
    </Stack>
  );
};

export default InvitationItem;
