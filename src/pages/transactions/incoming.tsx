import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "src/api/transaction";
import TransactionItem from "src/components/transaction-item";
import { useAuthContext } from "src/providers/auth";

const IncomingTransactions = () => {
  const { userData } = useAuthContext();
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getUserTransactions(userData.data!.user._id),
  });
  return (
    <Stack gap={1}>
      {transactions?.data!.map((transaction) => (
        <TransactionItem transaction={transaction} />
      ))}
    </Stack>
  );
};

export default IncomingTransactions;
