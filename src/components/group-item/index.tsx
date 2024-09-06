import { Avatar, Box, ListItemButton, Stack, Typography } from '@mui/material';

import defaultImageUrl from '../../assets/images/itu-circle.png';

import { generatePath, useNavigate } from 'react-router-dom';
import ShadeComponent from '../shade-component';
import TagItem from '../tag';
import { Group } from '~/api/groups';
import { paths } from '~/app/routes';

type Props = {
  group: Group;
};

const GroupItem = ({ group }: Props) => {
  const navigate = useNavigate();
  const groupId = group.id;
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
          generatePath(paths.groupDetails, {
            groupId,
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
            src={group.picture || defaultImageUrl}
          />
          <Stack gap={1}>
            <Typography fontSize={15} fontWeight={600}>
              {group.name}
            </Typography>
            {group.shade && <ShadeComponent color={group.shade.color} name={group.shade.en} />}
            <Stack direction="row" gap={1}>
              {group.tags?.map((tag, i) => <TagItem key={i} tag={tag} />)}
            </Stack>
          </Stack>
        </Box>
        <Avatar sx={{ bgcolor: 'black' }}>
          <Typography color="white">{group.membersCount}</Typography>
        </Avatar>
      </Box>
    </ListItemButton>
  );
};

export default GroupItem;
