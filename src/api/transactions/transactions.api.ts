import { request } from '~/lib/request';
import { TransactionAction, TransactionType, TTransaction } from './transactions.schema';
import { decodeBody, decodeBodyWithPagination } from '../common';

export type GetUserTransactionsInput = {
  userId: string;
  type: TransactionType;
};

// TODO!
export const getUserTransactions = async ({ userId, type, page }: GetUserTransactionsInput & { page: number }) => {
  const query = new URLSearchParams();

  query.set('type', type);
  query.set('page', String(page));

  return await request('/api/v1/users/:userId/transactions').get(
    {
      params: {
        userId,
      },
    },
    decodeBodyWithPagination(TTransaction),
  );
};

export type GetTransactionDetailsInput = {
  transactionId: string;
};

export const getTransactionDetails = async ({ transactionId }: GetTransactionDetailsInput) => {
  return await request('/api/v1/transactions/:transactionId').get(
    {
      params: {
        transactionId,
      },
    },
    decodeBody(TTransaction),
  );
};

export type GetPendingTransactionsInput = {
  userId: string;
  type: TransactionType;
};

export const getPendingTransactions = async ({
  userId,
  type,
  page,
}: GetPendingTransactionsInput & { page: number }) => {
  const query = new URLSearchParams();

  query.set('type', type);
  query.set('page', String(page));

  return await request('/api/v1/users/:userId/transactions/pending').get(
    { query, params: { userId } },
    decodeBodyWithPagination(TTransaction),
  );
};

type AcceptTransactionInput = {
  userId: string;
  transactionId: string;
  action: TransactionAction;
};

export const pendingTransactionAction = async ({ userId, transactionId, action }: AcceptTransactionInput) => {
  return await request('/api/v1/users/:userId/transactions/pending/:transactionId').post(
    {
      params: {
        userId,
        transactionId,
      },
      body: {
        status: action,
      },
    },
    decodeBody(TTransaction),
  );
};
