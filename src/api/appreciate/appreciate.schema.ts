import { z } from 'zod';

export const TAppreciateQRCode = z.object({
  code: z.number(),
  success: z.boolean(),
  data: z.object({
    code: z.string(),
    area: z.string(),
    hashtag: z.string(),
    oneTimeUse: z.boolean(),
    receiver: z.boolean(),
  }),
});

export const TAppreciateUserInput = z.object({
  _id: z.string(),
  postId: z.string().optional(),
  shade: z.string().optional(),
  hashtag: z.string().optional(),
  comment: z.string().optional(),
  mobileNumber: z.string().optional(),
});

export type AppreciateUserInput = z.infer<typeof TAppreciateUserInput>;

export const TGetAppreciateUser = z.object({
  area: z.string().optional(),
  hashtag: z.string().optional(),
});

export type GetAppreciateUser = z.infer<typeof TGetAppreciateUser>;

export const TGetAppreciateQRCode = z.object({
  success: z.boolean(),
  code: z.number(),
  data: z.string(),
});
