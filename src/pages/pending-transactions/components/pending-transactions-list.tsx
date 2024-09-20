import { Skeleton, Stack, Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import PendingTransactionItem from 'src/components/pending-transaction-component';
import { match, P } from 'ts-pattern';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPendingTransactions, TransactionType } from '~/api/transactions';
import { qk } from '~/api/query-keys';
import { useAuthUser } from '~/app/auth';
import { ErrorView } from '~/components/error-view';

type TransactionsListProps = {
  type: TransactionType;
};

export const PendingTransactionsList = ({ type }: TransactionsListProps) => {
  const authUser = useAuthUser();

  const [ref, inView] = useInView();

  const $pendingTransactions = useInfiniteQuery({
    queryKey: qk.transactions.pendingTransactions.toKeyWithArgs({ userId: authUser!.user.id, type }),
    queryFn: async ({ pageParam = 1 }) => getPendingTransactions({ userId: authUser!.user.id, type, page: pageParam }),
    getNextPageParam: (result) => {
      const nextPage = result.meta.page + 1;
      return nextPage <= result.meta.totalPages ? nextPage : undefined;
    },
    enabled: authUser !== null,
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
        .with({ isError: true }, () => <ErrorView message="Failed to load transactions." />)
        .with({ isSuccess: true, data: P.select() }, ({ pages }) => {
          const transactions = pages.flatMap((page) => page.data);

          if (transactions.length === 0) {
            return (
              <Typography textAlign="center" color="text.secondary" mt={3}>
                No transactions found.
              </Typography>
            );
          }

          return (
            <Stack gap={2}>
              {transactions.map((transaction) => (
                <PendingTransactionItem
                  key={transaction.id}
                  transaction={{
                    id: transaction.id,
                    user: {
                      name:
                        type === 'INCOMING'
                          ? transaction.sender?.name || 'Unknown'
                          : transaction.receiver?.name || 'Unknown',
                      avatar: type === 'INCOMING' ? transaction.sender?.picture : transaction.receiver?.picture,
                    },
                    area: transaction?.shade,
                    hashtag: transaction.hashtag,
                  }}
                  transactionType={type}
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
