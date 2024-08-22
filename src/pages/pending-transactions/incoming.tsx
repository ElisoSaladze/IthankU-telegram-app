import TransactionsList from "src/pages/pending-transactions/pending-transactions-list";

const IncomingPendingTransactions: React.FC = () => {
  return <TransactionsList type="incoming" />;
};

export default IncomingPendingTransactions;