import { Box, Divider, Menu, MenuItem } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '~/app/routes';
import { CreatePostDialog } from '../create-post';
import { useBoolean } from '~/lib/hooks';

type Props = {
  button: ReactNode;
};

export const CreatePostGroupMenu = ({ button }: Props) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isPostsDialogOpen = useBoolean();

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {button}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            isPostsDialogOpen.setTrue();
          }}
        >
          Create Post
        </MenuItem>
        <Divider
          sx={{
            bgcolor: 'primary.main',
            '&.MuiDivider-root': {
              margin: '0 !important',
            },
          }}
        />
        <MenuItem onClick={() => navigate(paths.createGroupDetails)}>Create Group</MenuItem>
      </Menu>

      <CreatePostDialog isOpen={isPostsDialogOpen.isTrue} onClose={isPostsDialogOpen.setFalse} />
    </>
  );
};
