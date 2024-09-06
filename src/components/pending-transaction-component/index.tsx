import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import ShadeComponent from '../shade-component';
import { Shade } from '~/api/shades';
import { pendingTransactionAction, TransactionAction } from '~/api/transactions';
import { useAuthUser } from '~/app/auth';
import { toast } from 'react-toastify';
import { ToastContent } from '../toast';

type PendingTransactionItemProps = {
  transaction: {
    id: string;
    user: {
      name: string;
      avatar?: string | null;
    };
    area: Shade;
    hashtag: string;
  };
  refetch: () => void;
};

const PendingTransactionItem = ({ transaction, refetch }: PendingTransactionItemProps) => {
  const authUser = useAuthUser();

  const $pendingTransactionAction = useMutation({
    mutationFn: pendingTransactionAction,
  });

  const onTransactionAction = (action: TransactionAction) => {
    if (authUser) {
      $pendingTransactionAction.mutate(
        {
          action,
          transactionId: transaction.id,
          userId: authUser?.user.id,
        },
        {
          onSuccess: () => {
            refetch();
          },
        },
      );

      return;
    }

    toast.error(
      <ToastContent title="Error">
        <Typography>Failed to change transaction status, user is not defined!</Typography>
      </ToastContent>,
    );
  };

  return (
    <Stack
      gap={2}
      alignItems="center"
      direction="row"
      sx={{
        width: 1,
        borderRadius: 5,
        padding: 2,
        boxShadow: '0px 0px 8.2px -1px #00000026',
        backgroundColor: '#fff',
      }}
    >
      <Avatar sx={{ width: 60, height: 60, borderRadius: '50%' }} src={transaction.user.avatar ?? ''} />
      <Stack gap={0.5} width={1}>
        <Typography variant="h6" fontWeight="bold">
          {transaction.user.name}
        </Typography>
        <ShadeComponent color={transaction.area.color} name={transaction.area.en} />
        <Typography variant="body2">
          Hashtag: <b>#{transaction.hashtag}</b>
        </Typography>
        <Box display="flex" gap={2} mt={1}>
          <Button
            onClick={() => {
              onTransactionAction('accepted');
            }}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#45a049' },
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              onTransactionAction('cancelled');
            }}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#e0e0e0',
              color: '#757575',
              '&:hover': { backgroundColor: '#d5d5d5' },
            }}
          >
            Decline
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PendingTransactionItem;
