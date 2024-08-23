import { Skeleton, Stack, Typography } from "@mui/material";
import { getPendingTransactions } from "src/api/transaction";
import { useQuery } from "@tanstack/react-query";
import {
  Transaction,
  UserTransactionsResponse,
} from "src/api/transaction/types";
import PendingTransactionItem from "src/components/pending-transaction-component";
import { match } from "ts-pattern";
import { P } from "ts-pattern";

type TransactionsListProps = {
  type: "incoming" | "outgoing";
};

const TransactionsList = ({ type }: TransactionsListProps) => {
  const $pendingTransactions = useQuery<UserTransactionsResponse>({
    queryKey: [`${type}-transactions`],
    queryFn: () => getPendingTransactions(type),
  });

  return match($pendingTransactions)
    .with({ isLoading: true }, () => (
      <Stack gap={1}>
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
      </Stack>
    ))
    .with({ isError: true }, () => (
      <Typography>Failed to load transactions.</Typography>
    ))
    .with({ isSuccess: true, data: P.select() }, (data) => {
      if (!data.data?.length) {
        return <Typography>No transactions found.</Typography>;
      }

      return (
        <Stack gap={2}>
          {data.data.map((transaction: Transaction) => (
            <PendingTransactionItem
              key={transaction._id}
              transaction={{
                id: transaction._id,
                user: {
                  name:
                    type === "incoming"
                      ? transaction.sender?.name || "Unknown"
                      : transaction.receiver?.name || "Unknown",
                  avatar:
                    type === "incoming"
                      ? transaction.sender?.picture
                      : transaction.receiver?.picture,
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
    .run();
};

export default TransactionsList;
