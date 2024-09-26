import { Avatar, Box, Button, Typography } from '@mui/material';
import { useAuthUser } from '~/app/auth';
import { CreatePostDialog } from '~/components/create-post';
import { useBoolean } from '~/lib/hooks';

type Props = {
  spaceId?: string;
};

export const WritePost = ({ spaceId }: Props) => {
  const authUser = useAuthUser();

  const isPostCreationDialogOpen = useBoolean();

  return (
    <>
      <Box
        sx={{
          width: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'stretch',
          gap: 1,
          p: 2,
          boxShadow: '0px 0px 8.9px -3px #00000040',
          borderRadius: 3.5,
        }}
      >
        <Avatar src={authUser?.user.picture} />
        <Typography sx={{ flex: 1, color: '#999999' }}>Write something...</Typography>
        <Button onClick={isPostCreationDialogOpen.setTrue} variant="outlined">
          Post
        </Button>
      </Box>

      <CreatePostDialog
        isOpen={isPostCreationDialogOpen.isTrue}
        onClose={isPostCreationDialogOpen.setFalse}
        spaceId={spaceId}
      />
    </>
  );
};
