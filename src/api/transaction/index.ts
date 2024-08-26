import { get, post } from "src/lib/request/request";

import { TransactionData, UserTransactionsResponse } from "./types";

export const getUserTransactions = async (
  userId: string,
  type: string,
  page: number
) =>
  get<UserTransactionsResponse>(
    `transactions?user=${userId}&type=${type}&page=${page}`
  );

export const getTranasctionDetails = async (transactionId: string) =>
  get<TransactionData>(`transactions/${transactionId}`);

export const getPendingTransactions = async (type: string, page: string) =>
  get<UserTransactionsResponse>(
    `transactions/pending?type=${type}&page=${page}`
  );

export const acceptTransaction = async (transactionId: string) =>
  post<TransactionData>(`transactions/pending/${transactionId}`, {
    status: "accepted",
  });

export const declineTransaction = async (transactionId: string) =>
  post<TransactionData>(`transactions/pending/${transactionId}`, {
    status: "cancelled",
  });
