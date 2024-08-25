import { request } from '~/lib/request';
import { TransactionType, TTransactionData, TUserTransactionsResponse } from './transactions.schema';

export type GetUserTransactionsInput = {
  userId: string;
  type: TransactionType;
};

export const getUserTransactions = async ({ userId, type }: GetUserTransactionsInput) => {
  const query = new URLSearchParams();

  query.set('user', userId);
  query.set('type', type);

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

export type GetPendingTransactionsInput = {
  type: TransactionType;
};

export const getPendingTransactions = async ({ type }: GetPendingTransactionsInput) => {
  const query = new URLSearchParams();

  query.set('type', type);

  return await request('/transactions/pending').get({ query }, TUserTransactionsResponse);
};

type AcceptTransactionInput = {
  transactionId: string;
};

export const acceptTransaction = async ({ transactionId }: AcceptTransactionInput) => {
  return await request('/transactions/pending/:transactionId').post(
    {
      params: {
        transactionId,
      },
    },
    TTransactionData,
  );
};

type DeclineTransactionInput = {
  transactionId: string;
};

export const declineTransaction = async ({ transactionId }: DeclineTransactionInput) => {
  return await request('/transactions/pending/:transactionId').post(
    {
      params: {
        transactionId,
      },
      body: {
        status: 'cancelled',
      },
    },
    TTransactionData,
  );
};
