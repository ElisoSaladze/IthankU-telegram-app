import AddIcon from '@mui/icons-material/Add';
import { Button, Divider, IconButton, Menu, MenuItem, Skeleton, Stack, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userGroups } from '~/api/groups';
import GroupItem from 'src/components/group-item';
import settingsIcon from 'src/assets/icons/settings.svg';
import { paths } from 'src/app/routes';
import { qk } from 'src/api/query-keys';
const GroupsPage = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, isLoading } = useQuery({
    queryKey: qk.groups.userGroups.toKey(),
    queryFn: userGroups,
  });

  return (
    <Stack mx={3} pb={2}>
      <Stack mt={2} justifyContent="space-between" alignItems="center" direction="row">
        <Button onClick={handleClick} size="medium" variant="contained" endIcon={<AddIcon />}>
          Create
        </Button>
        <Menu
          sx={{
            marginTop: 1,
          }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => navigate(paths.createPost)}>Create Post</MenuItem>
          <Divider
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&.MuiDivider-root': {
                margin: '0 !important',
              },
            }}
          />
          <MenuItem onClick={() => navigate(paths.createGroupDetails)}>Create Group</MenuItem>
        </Menu>
        <IconButton onClick={() => navigate(paths.groupSettings)}>
          <img src={settingsIcon} />
        </IconButton>
      </Stack>
      {isLoading ? (
        <Stack marginY={1} gap={1}>
          {[...Array(5)].map((_, index) => (
            <Skeleton sx={{ borderRadius: 5 }} key={index} variant="rectangular" height={80} />
          ))}
        </Stack>
      ) : (
        <Stack marginY={1} gap={1} marginBottom={10}>
          {data?.data.map((group, i) => <GroupItem key={i} group={group} />)}
        </Stack>
      )}
    </Stack>
  );
};

export default GroupsPage;
