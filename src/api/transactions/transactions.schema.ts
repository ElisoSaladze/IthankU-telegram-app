import { z } from 'zod';
import { TAuthor } from '../group';
import { TShade } from '../shades';

export const TTransactionType = z.union([z.literal('incoming'), z.literal('outgoing')]);

export type TransactionType = z.infer<typeof TTransactionType>;

export const TTransaction = z.object({
  _id: z.string(),
  amount: z.number(),
  shade: z.string(),
  hashtag: z.string(),
  itu: z.number(),
  createdAt: z.string(),
  comment: z.string(),
  sender: TAuthor.optional(),
  receiver: TAuthor.optional(),
  shadeInfo: TShade,
});

export type Transaction = z.infer<typeof TTransaction>;

export const TUserTransactionsResponse = z.object({
  status: z.string(),
  page: z.number(),
  results: z.number(),
  totalResults: z.number(),
  totalPages: z.number(),
  data: z.array(TTransaction).optional(),
});

export const TTransactionData = z.object({
  status: z.string(),
  data: TTransaction,
});
