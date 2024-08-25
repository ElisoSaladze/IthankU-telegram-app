import { request } from '~/lib/request';
import { TTransactionData, TUserTransactionsResponse } from './transactions.schema';

export type GetUserTransactionsInput = {
  userId: string;
};

export const getUserTransactions = async ({ userId }: GetUserTransactionsInput) => {
  const query = new URLSearchParams();

  query.set('user', userId);

  return await request('/transactions').get({}, TUserTransactionsResponse);
};

export type GetTransactionDetailsInput = {
  transactionId: string;
};

export const getTransactionDetails = async ({ transactionId }: GetTransactionDetailsInput) => {
  return await request('/transactions/:transactionId').get(
    {
      params: {
        transactionId,
      },
    },
    TTransactionData,
  );
};

export const getPendingTransactions = async () => {
  return await request('/transactions/pending').get({}, TUserTransactionsResponse);
};
