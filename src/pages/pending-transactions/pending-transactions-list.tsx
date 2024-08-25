import { Skeleton, Stack, Typography } from '@mui/material';
import { getPendingTransactions } from 'src/api/transaction';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Transaction } from 'src/api/transaction/types';
import PendingTransactionItem from 'src/components/pending-transaction-component';
import { match, P } from 'ts-pattern';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type TransactionsListProps = {
  type: TransactionType;
};

const TransactionsList = ({ type }: TransactionsListProps) => {
  const [ref, inView] = useInView();

  const $pendingTransactions = useInfiniteQuery({
    queryKey: ['transactions', type],
    queryFn: async ({ pageParam = 1 }) => getPendingTransactions(type, pageParam),
    getNextPageParam: (result) => {
      const nextPage = result.page + 1;
      return nextPage <= result.totalPages ? nextPage : undefined;
    },
  });

  const handleFetchNextPage = useCallback(() => {
    if ($pendingTransactions.hasNextPage) {
      $pendingTransactions.fetchNextPage();
    }
  }, [$pendingTransactions]);

  useEffect(() => {
    if (inView && $pendingTransactions.hasNextPage) {
      handleFetchNextPage();
    }
  }, [inView, handleFetchNextPage, $pendingTransactions.hasNextPage]);

  return (
    <Stack gap={2}>
      {match($pendingTransactions)
        .with({ isLoading: true }, () => (
          <>
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
          </>
        ))
        .with({ isError: true }, () => <Typography>Failed to load transactions.</Typography>)
        .with({ isSuccess: true, data: P.select() }, ({ pages }) => {
          const transactions = pages.flatMap((page) => page.data!);

          if (!transactions.length) {
            return <Typography>No transactions found.</Typography>;
          }

          return (
            <Stack gap={2}>
              {transactions.map((transaction: Transaction) => (
                <PendingTransactionItem
                  key={transaction._id}
                  transaction={{
                    id: transaction._id,
                    user: {
                      name:
                        type === 'incoming'
                          ? transaction.sender?.name || 'Unknown'
                          : transaction.receiver?.name || 'Unknown',
                      avatar: type === 'incoming' ? transaction.sender?.picture : transaction.receiver?.picture,
                    },
                    area: transaction.shadeInfo,
                    hashtag: transaction.hashtag,
                  }}
                  refetch={$pendingTransactions.refetch}
                />
              ))}
            </Stack>
          );
        })
        .otherwise(() => (
          <Stack gap={2}>
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
          </Stack>
        ))}
      {$pendingTransactions.hasNextPage && (
        <div ref={ref} style={{ textAlign: 'center' }}>
          <Typography onClick={handleFetchNextPage} style={{ cursor: 'pointer', color: 'blue' }}>
            {$pendingTransactions.isFetchingNextPage ? 'Loading more...' : 'Show more'}
          </Typography>
        </div>
      )}
    </Stack>
  );
};

export default TransactionsList;
