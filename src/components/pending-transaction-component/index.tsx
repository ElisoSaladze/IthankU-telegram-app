import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import ShadeComponent from '../shade-component';
import { Shade } from '~/api/shades';
import { acceptTransaction, declineTransaction } from '~/api/transactions';

type PendingTransactionItemProps = {
  transaction: {
    id: string;
    user: {
      name: string;
      avatar?: string;
    };
    area: Shade;
    hashtag: string;
  };
  refetch: () => void;
};

const PendingTransactionItem = ({ transaction, refetch }: PendingTransactionItemProps) => {
  const $acceptTransaction = useMutation({
    mutationFn: acceptTransaction,
  });

  const $declineTransaction = useMutation({
    mutationFn: declineTransaction,
  });

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
      <Avatar sx={{ width: 60, height: 60, borderRadius: '50%' }} src={transaction.user.avatar} />
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
              $acceptTransaction.mutate(
                {
                  transactionId: transaction.id,
                },
                {
                  onSuccess: () => {
                    refetch();
                  },
                },
              );
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
              $declineTransaction.mutate(
                {
                  transactionId: transaction.id,
                },
                {
                  onSuccess: () => {
                    refetch();
                  },
                },
              );
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
