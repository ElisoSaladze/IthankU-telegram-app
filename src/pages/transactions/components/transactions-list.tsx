import { Stack, Skeleton, Typography, Button } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import TransactionItem from 'src/components/transaction-item';
import { match, P } from 'ts-pattern';
import { qk } from '~/api/query-keys';
import { getUserTransactions } from '~/api/transactions';
import { useAuthUser } from '~/app/auth';

export const TransactionsList = ({ type }: { type: 'incoming' | 'outgoing' }) => {
  const [ref, inView] = useInView();
  const authUser = useAuthUser();

  const $transactions = useInfiniteQuery({
    queryKey: qk.transactions.userTransactions.toKeyWithArgs({ userId: authUser!.user.id, type }), // TODO!
    queryFn: async ({ pageParam = 1 }) => getUserTransactions({ userId: authUser!.user.id, type, page: pageParam }),
    getNextPageParam: (result) => {
      const nextPage = result.meta.page + 1;
      return nextPage <= result.meta.totalPages ? nextPage : undefined;
    },
    enabled: authUser !== null,
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
            page.data?.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />),
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
