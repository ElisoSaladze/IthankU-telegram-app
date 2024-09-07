import { z } from 'zod';
import { TAuthor } from '../groups';
import { TShade } from '../shades';

export const TTransactionAction = z.union([z.literal('ACCEPT'), z.literal('DECLINE'), z.literal('PENDING')]);

export type TransactionAction = z.infer<typeof TTransactionAction>;

export const TTransactionType = z.union([z.literal('incoming'), z.literal('outgoing')]);

export type TransactionType = z.infer<typeof TTransactionType>;

export const TTransaction = z.object({
  id: z.string(),
  amount: z.number(),
  hashtag: z.string(),
  itu: z.number().optional(),
  createdAt: z.string(),
  comment: z.string(),
  sender: TAuthor.optional(),
  receiver: TAuthor.optional(),
  shade: TShade,
});

export type Transaction = z.infer<typeof TTransaction>;
