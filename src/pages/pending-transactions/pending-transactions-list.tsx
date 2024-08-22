import { Stack, Typography } from "@mui/material";
import { getPendingTransactions } from "src/api/transaction";
import { useQuery } from "@tanstack/react-query";
import {
  Transaction,
  UserTransactionsResponse,
} from "src/api/transaction/types";
import Loader from "src/components/loader";
import PendingTransactionItem from "src/components/pending-transaction-component";

type TransactionsListProps = {
  type: "incoming" | "outgoing";
};

const TransactionsList: React.FC<TransactionsListProps> = ({ type }) => {
  const {
    data: transactionsResponse,
    isLoading,
    isError,
  } = useQuery<UserTransactionsResponse>({
    queryKey: [`${type}-transactions`],
    queryFn: () => getPendingTransactions(type),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !transactionsResponse?.data?.length) {
    return <Typography>No transactions found.</Typography>;
  }

  return (
    <Stack gap={2}>
      {transactionsResponse.data.map((transaction: Transaction) => (
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
                  ? transaction.sender?.picture || ""
                  : transaction.receiver?.picture || "",
            },
            area: transaction.shadeInfo?.en || "General",
            hashtag: transaction.hashtag,
          }}
          refetch={() => {}}
        />
      ))}
    </Stack>
  );
};

export default TransactionsList;
