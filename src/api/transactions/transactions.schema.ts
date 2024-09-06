import { z } from 'zod';
import { TAuthor } from '../groups';
import { TShade } from '../shades';

export const TTransactionAction = z.union([z.literal('accepted'), z.literal('cancelled')]);

export type TransactionAction = z.infer<typeof TTransactionAction>;

export const TTransactionType = z.union([z.literal('incoming'), z.literal('outgoing')]);

export type TransactionType = z.infer<typeof TTransactionType>;

export const TTransaction = z.object({
  id: z.string(),
  amount: z.number(),
  shade: z.string(),
  hashtag: z.string(),
  itu: z.number().optional(),
  createdAt: z.string(),
  comment: z.string(),
  sender: TAuthor.optional(),
  receiver: TAuthor.optional(),
  shadeInfo: TShade,
});

export type Transaction = z.infer<typeof TTransaction>;
