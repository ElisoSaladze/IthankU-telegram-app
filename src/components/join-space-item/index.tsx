import DoneIcon from '@mui/icons-material/Done';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import ShadeComponent from '../shade-component';
import { Space, joinSpace } from '~/api/spaces';
import { Progress } from '../progress';

type Props = {
  space: Space;
};

const SpaceItem = ({ space }: Props) => {
  const [joined, setJoined] = useState(false);

  const $joinSpace = useMutation({
    mutationFn: joinSpace,
  });

  const handleJoinSpace = () => {
    $joinSpace.mutate(
      {
        spaceId: space.id,
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
        <Avatar sx={{ height: 62, width: 62 }} src={space.picture ?? ''} />
        <Stack>
          <Typography fontSize={15} fontWeight={600}>
            {space.name}
          </Typography>
          <Typography fontSize={12} color="secondary.dark">
            {space.membersCount} Members
          </Typography>
          {space.shade && <ShadeComponent color="green" name={space.shade.en} />}
        </Stack>
      </Stack>
      {$joinSpace.isLoading ? (
        <Progress centered />
      ) : !joined ? (
        <Button size="small" variant="outlined" onClick={handleJoinSpace}>
          join
        </Button>
      ) : (
        <DoneIcon color="primary" sx={{ marginRight: 2 }} />
      )}
    </Stack>
  );
};

export default SpaceItem;
