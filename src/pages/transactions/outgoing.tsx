import { Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "src/api/transaction";
import TransactionItem from "src/components/transaction-item";
import { useAuthContext } from "src/providers/auth";
import { match, P } from "ts-pattern";

const OutgoingTransactions = () => {
  const { userData } = useAuthContext();
  const $transactions = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getUserTransactions(userData.data!.user._id),
  });
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
        .with({ isError: true }, () => (
          <Typography>Failed to load transactions.</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, ({ data: transactions }) =>
          transactions?.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))
        )
        .otherwise(() => (
          <>
            <Skeleton variant="rectangular" height={80} />
            <Skeleton variant="rectangular" height={80} />
          </>
        ))}
    </Stack>
  );
};

export default OutgoingTransactions;
