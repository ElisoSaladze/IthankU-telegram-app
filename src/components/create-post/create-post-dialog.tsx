import { Dialog } from '@mui/material';
import { CreatePostForm } from './create-post-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreatePostDialog = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <CreatePostForm onClose={onClose} />
    </Dialog>
  );
};
