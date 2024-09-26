import { z } from 'zod';
import { TAuthor } from '../spaces';
import { TShade } from '../shades';

export const TTransactionAction = z.union([z.literal('ACCEPT'), z.literal('DECLINE'), z.literal('PENDING')]);

export type TransactionAction = z.infer<typeof TTransactionAction>;

export const TTransactionType = z.union([z.literal('INCOMING'), z.literal('OUTGOING')]);

export type TransactionType = z.infer<typeof TTransactionType>;

export const TTransaction = z.object({
  id: z.string(),
  amount: z.number(),
  hashtag: z.string(),
  itu: z.number().optional(),
  createdAt: z.string(),
  comment: z.string().nullable(),
  sender: TAuthor.nullable(),
  receiver: TAuthor.optional(),
  shade: TShade.nullable(),
});

export type Transaction = z.infer<typeof TTransaction>;
