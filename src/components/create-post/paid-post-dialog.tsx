import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import paid from 'src/assets/images/paid.png';
import { Progress } from '../progress';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: () => void;
};

export const PaidPostDialog = ({ isOpen, onClose, isLoading, onSubmit }: Props) => {
  return (
    <Dialog fullWidth maxWidth="lg" open={isOpen} onClose={onClose} PaperProps={{ sx: { bgcolor: 'transparent' } }}>
      <DialogContent
        sx={{
          p: 3,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="img" width={120} src={paid} alt="paid" />

        <Typography fontSize={32} fontWeight={600} textAlign="center" my={3}>
          Ready to publish your paid post?
        </Typography>

        <Typography fontSize={15} textAlign="center">
          Publishing a paid post requires{' '}
          <Typography component="span" color="primary">
            one coin.
          </Typography>{' '}
          Please confirm your payment of one coin to proceed.
        </Typography>

        <Button
          disabled={isLoading}
          fullWidth
          onClick={onSubmit}
          sx={{ mt: 6, mb: 3 }}
          size="large"
          variant="contained"
        >
          {isLoading ? <Progress /> : 'Publish'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
