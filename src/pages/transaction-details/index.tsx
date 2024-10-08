import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { match, P } from 'ts-pattern';
import CopyableItem from 'src/components/copyable-item';
import Loader from 'src/components/loader';
import { TransactionBackground } from 'src/assets/images/transaction-backround';
import { getTransactionDetails } from '~/api/transactions';
import { qk } from '~/api/query-keys';
import { paths } from '~/app/routes';
import { ErrorView } from '~/components/error-view';

const TransactionDetailsPage = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const navigate = useNavigate();

  const $transaction = useQuery({
    queryKey: qk.transactions.details.toKeyWithArgs({ transactionId: transactionId! }),
    queryFn: () => getTransactionDetails({ transactionId: transactionId! }),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram!.WebApp;
  app.BackButton.show();
  app.BackButton.onClick(() => {
    navigate(paths.transactionsList);
  });

  return (
    <>
      {match($transaction)
        .with({ isLoading: true }, () => <Loader />)
        .with({ isError: true }, () => <ErrorView message="Failed to get transaction details" />)
        .with({ isSuccess: true, data: P.select() }, ({ data: transaction }) => (
          <Stack>
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: -1,
              }}
            >
              <TransactionBackground fill={transaction.shade?.color} />
            </Box>

            <Stack justifyContent="center" gap={1} mt={2} mx={2}>
              <Typography fontWeight={600} fontSize={32} color="white" textAlign="center">
                {transaction.shade?.en}
              </Typography>
              <Typography color="white" textAlign="center">
                #{transaction.hashtag}
              </Typography>

              <Box mt={2} borderRadius={4} bgcolor="white">
                <CopyableItem
                  titleSx={{
                    fontWeight: 600,
                    fontSize: 30,
                  }}
                  sx={{ padding: 2, borderRadius: 5 }}
                  title="Transaction ID"
                  content={transaction.id}
                />
              </Box>

              <Stack
                boxShadow="0px 1px 7.8px -4px #00000040"
                borderRadius={5}
                p={2}
                bgcolor="white"
                justifyContent="center"
                gap={1}
              >
                <CopyableItem title="Date" content={new Date(transaction.createdAt).toDateString()} />
                <Divider />
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

                <CopyableItem contentColor="primary" title="ITU" content={transaction.amount.toString()} />

                {/* <Divider />

                <CopyableItem contentColor="primary" title="USD" content={transaction.amount!.toString()} /> */}
              </Stack>

              {transaction.comment && transaction.comment.length > 0 && (
                <Accordion sx={{ width: '100%' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography fontWeight={600}>Comment</Typography>
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
