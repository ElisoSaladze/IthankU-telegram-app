import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Divider,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { match, P } from 'ts-pattern';
import CopyableItem from 'src/components/copyable-item';
import Loader from 'src/components/loader';
import { TransactionBackground } from 'src/assets/images/transaction-backround';
import { getTransactionDetails } from '~/api/transactions';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';

const TransactionDetailsPage = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  const $transaction = useQuery({
    queryKey: qk.transactions.details.toKeyWithArgs({ transactionId: transactionId! }),
    queryFn: () => getTransactionDetails({ transactionId: transactionId! }),
  });

  return (
    <>
      {match($transaction)
        .with({ isLoading: true }, () => <Loader />)
        .with({ isError: true }, () => <Typography>Failed to get transaction details</Typography>)
        .with({ isSuccess: true, data: P.select() }, ({ data: transaction }) => (
          <Stack height="100vh">
            <AppBar
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
              }}
            >
              <Toolbar>
                <ArrowBackIosIcon onClick={() => navigate(-1)} sx={{ color: 'white', cursor: 'pointer' }} />
              </Toolbar>
            </AppBar>

            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: -1,
              }}
            >
              <TransactionBackground fill={transaction.shade.color} />
            </Box>

            <Stack justifyContent="center" gap={1} marginTop={5} marginX={2}>
              <Typography color="white" textAlign="center">
                {transaction.shade.en}
              </Typography>
              <Typography color="white" textAlign="center">
                {transaction.hashtag}
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: -1,
                }}
              >
                <CopyableItem sx={{ padding: 2, borderRadius: 5 }} title="Transaction ID" content={transaction.id} />
              </Box>

              <Stack justifyContent="center" gap={1} mt={5} mx={2}>
                <Typography color="white" textAlign="center">
                  {transaction.shade.en}
                </Typography>
                <Typography color="white" textAlign="center">
                  {transaction.hashtag}
                </Typography>

                <ListItemButton
                  onClick={() => {
                    const senderId = transaction.sender!.id;
                    navigate(generatePath(paths.more, { senderId }));
                  }}
                >
                  <Stack width="100%" direction="row" justifyContent="space-between">
                    <Typography fontSize={14}>Sender</Typography>
                    <Stack direction="row" alignItems="center">
                      <Typography fontSize={14}>{transaction.sender!.name}</Typography>
                      <ArrowForwardIosIcon sx={{ height: '10px' }} />
                    </Stack>
                  </Stack>
                </ListItemButton>
                <Divider />

                <ListItemButton
                  onClick={() => {
                    const receiverId = transaction.receiver!.id;
                    navigate(generatePath(paths.more, { receiverId }));
                  }}
                >
                  <Stack width="100%" direction="row" justifyContent="space-between">
                    <Typography fontSize={14}>Receiver</Typography>
                    <Stack direction="row" alignItems="center">
                      <Typography fontSize={14}>{transaction.receiver!.name}</Typography>
                      <ArrowForwardIosIcon sx={{ height: '10px' }} />
                    </Stack>
                  </Stack>
                </ListItemButton>
                <Divider />

                {transaction.itu && (
                  <CopyableItem contentColor="primary" title="ITU" content={transaction.itu.toString()} />
                )}
                <Divider />

                <CopyableItem contentColor="primary" title="USD" content={transaction.amount!.toString()} />
              </Stack>

              {transaction.comment!.length > 0 && (
                <Accordion sx={{ width: '100%' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography>Comment</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CopyableItem title="" content={transaction.comment!} />
                  </AccordionDetails>
                </Accordion>
              )}
            </Stack>
          </Stack>
        ))
        .run()}
    </>
  );
};

export default TransactionDetailsPage;
