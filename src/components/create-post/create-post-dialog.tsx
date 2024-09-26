import { Dialog } from '@mui/material';
import { CreatePostForm } from './create-post-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  spaceId?: string;
  fromSpacePage?: boolean;
};

export const CreatePostDialog = ({ isOpen, onClose, spaceId, fromSpacePage }: Props) => {
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <CreatePostForm onClose={onClose} spaceId={spaceId} fromSpacePage={fromSpacePage} />
    </Dialog>
  );
};
