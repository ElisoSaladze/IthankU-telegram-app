import { Avatar, Box, ListItemButton, Stack, Typography } from '@mui/material';

import defaultImageUrl from '../../assets/images/itu-circle.png';

import { generatePath, useNavigate } from 'react-router-dom';
import ShadeComponent from '../shade-component';
import TagItem from '../tag';
import { Space } from '~/api/spaces';
import { paths } from '~/app/routes';

type Props = {
  space: Space;
};

const SpaceItem = ({ space }: Props) => {
  const navigate = useNavigate();
  const spaceId = space.id;
  return (
    <ListItemButton
      sx={{
        width: '100%',
        borderRadius: 8,
        p: 2,
        boxShadow: '0px 0px 8.2px -1px #00000026',
      }}
      onClick={() =>
        navigate(
          generatePath(paths.spaceDetails, {
            spaceId,
          }),
        )
      }
    >
      <Box sx={{ width: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          gap={1}
        >
          <Avatar
            sx={{ width: 70, height: 70, borderRadius: 4 }}
            variant="rounded"
            src={space.picture || defaultImageUrl}
          />
          <Stack gap={1}>
            <Typography fontSize={15} fontWeight={600}>
              {space.name}
            </Typography>
            {space.shade && <ShadeComponent color={space.shade.color} name={space.shade.en} />}
            <Stack direction="row" gap={1}>
              {space.tags?.map((tag, i) => <TagItem key={i} tag={tag} />)}
            </Stack>
          </Stack>
        </Box>
        <Avatar sx={{ bgcolor: 'black' }}>
          <Typography color="white">{space.membersCount}</Typography>
        </Avatar>
      </Box>
    </ListItemButton>
  );
};

export default SpaceItem;
