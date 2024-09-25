import { Avatar, Chip, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { generatePath, useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { Transaction } from '~/api/transactions';
import { paths } from '~/app/routes';

type Props = {
  transaction: Transaction;
  transactionType: 'INCOMING' | 'OUTGOING';
};

const TransactionItem = ({ transaction, transactionType }: Props) => {
  const navigate = useNavigate();

  const transactionId = transaction.id;
  const transactionUser = transactionType === 'INCOMING' ? transaction.sender : transaction.receiver;

  return (
    <ListItemButton
      onClick={() =>
        navigate({
          pathname: generatePath(paths.transactionDetails, {
            transactionId,
          }),
        })
      }
      sx={{
        width: '100%',
        borderRadius: 5,
        padding: 1,
        boxShadow: '0px 0px 8.2px -1px #00000026',
      }}
    >
      <Stack sx={{ width: 1 }} alignItems="center" justifyContent="space-between" direction="row">
        <Stack gap={1} alignItems="center" direction="row">
          <Avatar sx={{ height: 66, width: 66 }} src={transactionUser?.picture ?? ''} />
          <Stack>
            <Typography>{transactionUser?.name}</Typography>
            <Typography fontSize={14} color="primary.light">
              Area:{' '}
              <Chip
                sx={{ padding: 0, height: 'auto' }}
                label={
                  <Stack gap={0.5} alignItems="center" direction="row">
                    <CircleIcon sx={{ color: transaction.shade?.color, fontSize: 16 }} /> {transaction.shade?.en}
                  </Stack>
                }
                variant="outlined"
              />
            </Typography>
            <Typography fontSize={14} color="primary.light">
              Hashtag: {transaction.hashtag}
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </ListItemButton>
  );
};

export default TransactionItem;
