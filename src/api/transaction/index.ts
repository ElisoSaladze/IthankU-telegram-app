import { get } from "src/lib/request/request";

import { TransactionData, UserTransactionsResponse } from "./types";

export const getUserTransactions = async (userId: string) =>
  get<UserTransactionsResponse>(`transactions?user=${userId}`);

export const getTranasctionDetails = async (transactionId: string) =>
  get<TransactionData>(`transactions/${transactionId}`);
