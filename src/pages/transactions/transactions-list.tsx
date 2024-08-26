import { Stack, Skeleton, Typography, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import TransactionItem from 'src/components/transaction-item';
import { useAuthContext } from 'src/providers/auth';
import { match, P } from 'ts-pattern';
import { qk } from '~/api/query-keys';
import { getUserTransactions } from '~/api/transactions';

const TransactionsList = ({ type }: { type: 'incoming' | 'outgoing' }) => {
  const [ref, inView] = useInView();
  const { userData } = useAuthContext();

  const $transactions = useInfiniteQuery({
    queryKey: qk.transactions.userTransactions.toKeyWithArgs({ userId: userData.data!.user._id, type }), // TODO!
    queryFn: async ({ pageParam = 1 }) =>
      getUserTransactions({ userId: userData.data!.user._id, type, page: pageParam }),
    getNextPageParam: (result) => {
      const nextPage = result.page + 1;
      return nextPage <= result.totalPages ? nextPage : undefined;
    },
  });

  const handleFetchNextPage = useCallback(() => {
    if ($transactions.hasNextPage) {
      $transactions.fetchNextPage();
    }
  }, [$transactions]);

  useEffect(() => {
    if (inView && $transactions.hasNextPage) {
      handleFetchNextPage();
    }
  }, [inView, handleFetchNextPage, $transactions.hasNextPage]);

  return (
    <Stack gap={1}>
      {match($transactions)
        .with({ isLoading: true }, () => (
          <>
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
          </>
        ))
        .with({ isError: true }, () => <Typography>Failed to load transactions.</Typography>)
        .with({ isSuccess: true, data: P.select() }, ({ pages }) =>
          pages.flatMap((page) =>
            page.data?.map((transaction) => <TransactionItem key={transaction._id} transaction={transaction} />),
          ),
        )
        .otherwise(() => (
          <>
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
          </>
        ))}
      {$transactions.hasNextPage && (
        <Button
          disabled={!$transactions.hasNextPage || $transactions.isFetchingNextPage}
          ref={ref}
          onClick={handleFetchNextPage}
        >
          {$transactions.isFetchingNextPage ? 'Loading more posts' : 'Show more'}
        </Button>
      )}
    </Stack>
  );
};

export default TransactionsList;
