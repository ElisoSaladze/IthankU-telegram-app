import { Avatar, Chip, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { generatePath, useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import { Transaction } from '~/api/transactions';
import { paths } from '~/app/routes';

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const transactionId = transaction.id;

  const navigate = useNavigate();
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
          <Avatar sx={{ height: 66, width: 66 }} src={transaction.sender?.picture ?? ''} />
          <Stack>
            <Typography>{transaction.sender?.name}</Typography>
            <Typography fontSize={14}>
              Area:{' '}
              <Chip
                sx={{ padding: 0, height: 'auto' }}
                label={
                  <Stack gap={0.5} alignItems="center" direction="row">
                    <CircleIcon sx={{ color: transaction.shadeInfo.color, fontSize: 16 }} /> {transaction.shadeInfo.en}
                  </Stack>
                }
                variant="outlined"
              />
            </Typography>
            <Typography fontSize={14}>
              hashtag: <Chip sx={{ padding: 0, height: 'auto' }} label={transaction.hashtag} variant="outlined" />
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
