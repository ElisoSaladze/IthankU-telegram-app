import { request } from '~/lib/request';
import { TransactionAction, TransactionType, TTransaction } from './transactions.schema';
import { decodeBody, decodeBodyWithPagination } from '../common';

export type GetUserTransactionsInput = {
  userId: string;
  type: TransactionType;
  page?: number;
};

// TODO!
export const getUserTransactions = async ({ type, page, userId }: GetUserTransactionsInput) => {
  const query = new URLSearchParams();

  query.set('type', type);
  query.set('page', String(page));

  return await request('/api/v1/users/:userId/transactions').get(
    { params: { userId }, query },
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
  transactionId: string;
  action: TransactionAction;
};

export const pendingTransactionAction = async ({ transactionId, action }: AcceptTransactionInput) => {
  return await request('/api/v1/transactions/:transactionId').patch(
    {
      params: {
        transactionId,
      },
      body: {
        status: action,
      },
    },
    decodeBody(TTransaction),
  );
};
