import TransactionsList from "src/pages/pending-transactions/pending-transactions-list";

const OutgoingPendingTransactions: React.FC = () => {
  return <TransactionsList type="outgoing" />;
};

export default OutgoingPendingTransactions;
