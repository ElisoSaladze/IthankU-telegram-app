import { Avatar, Stack } from '@mui/material';
import { Author } from '~/api/groups';

type Props = {
  likes: Author[];
  size?: 'small' | 'medium' | 'large';
};

const LikesItem = ({ likes, size = 'small' }: Props) => {
  const getSize = () => {
    switch (size) {
      case 'medium':
        return { width: 36, height: 36 };
      case 'large':
        return { width: 50, height: 50 };
      default:
        return { width: 22, height: 22 };
    }
  };

  return (
    <Stack spacing={-2} direction={'row'}>
      {likes.map((like) => (
        <Avatar sx={getSize()} key={like._id} src={like.picture} />
      ))}
    </Stack>
  );
};

export default LikesItem;
