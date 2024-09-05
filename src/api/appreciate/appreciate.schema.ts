import { z } from 'zod';
import { TShade } from '../shades';
import { TAuthor } from '../groups';

export const TAppreciateQRCode = z.object({
  requestId: z.string(),
  shade: TShade.nullable(),
  hashtag: z.string().nullable(),
  // oneTimeUse: z.boolean(),
  receiver: TAuthor,
});

export const TAppreciateUserInput = z.object({
  receiverId: z.string(),
  requestId: z.string(),
  postId: z.string().optional(),
  shadeId: z.string().optional(),
  hashtag: z.string().optional(),
  comment: z.string().optional(),
  // mobileNumber: z.string().optional(),
});

export type AppreciateUserInput = z.infer<typeof TAppreciateUserInput>;

export const TGetAppreciateUser = z.object({
  shadeId: z.string().optional(),
  hashtag: z.string().optional(),
});

export type GetAppreciateUser = z.infer<typeof TGetAppreciateUser>;

export const TGetAppreciateQRCode = z.object({
  id: z.string(),
  hashtag: z.string().nullable(),
  qrCodeData: z.string(),
  qrCodeUrl: z.string(),
  requestId: z.string(),
  shade: TShade.nullable(),
  status: z.string(), // TODO add valid literals
});
