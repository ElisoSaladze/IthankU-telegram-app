import { Dialog } from '@mui/material';
import { CreatePostForm } from './create-post-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  groupId?: string;
  fromGroupPage?: boolean;
};

export const CreatePostDialog = ({ isOpen, onClose, groupId, fromGroupPage }: Props) => {
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <CreatePostForm onClose={onClose} groupId={groupId} fromGroupPage={fromGroupPage} />
    </Dialog>
  );
};
