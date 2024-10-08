import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import ShadeComponent from '../shade-component';
import { Group, joinGroup } from '~/api/groups';
import { Progress } from '../progress';

type Props = {
  group: Group;
};

const GroupItem = ({ group }: Props) => {
  const [joined, setJoined] = useState(false);

  const $joinGroup = useMutation({
    mutationFn: joinGroup,
  });

  const handleJoinGroup = () => {
    $joinGroup.mutate(
      {
        groupId: group.id,
      },
      {
        onSuccess: () => {
          setJoined(true);
        },
      },
    );
  };

  return (
    <Stack width={1} justifyContent="space-between" alignItems="center" direction="row">
      <Stack gap={1} alignItems="center" direction="row">
        <Avatar sx={{ height: 62, width: 62 }} src={group.picture ?? ''} />
        <Stack>
          <Typography fontSize={15} fontWeight={600}>
            {group.name}
          </Typography>
          <Typography fontSize={12} color="secondary.dark">
            {group.membersCount} Members
          </Typography>
          {group.shade && <ShadeComponent color="green" name={group.shade.en} />}
        </Stack>
      </Stack>
      {$joinGroup.isLoading ? (
        <Progress centered />
      ) : !joined ? (
        <Button size="small" variant="outlined" onClick={handleJoinGroup}>
          join
        </Button>
      ) : (
        <DoneIcon color="primary" sx={{ marginRight: 2 }} />
      )}
    </Stack>
  );
};

export default GroupItem;
