import { z } from 'zod';

export const TUserRole = z.literal('user'); // TODO

export const TUserType = z.object({
  _id: z.string(),
  email: z.string(),
  isLocationPublic: z.boolean(),
  name: z.string(),
  physicalPoints: z.number(),
  picture: z.string(),
  ratingPoints: z.number(),
  role: z.string(),
});

export type UserType = z.infer<typeof TUserType>;

export const TAuthUser = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: TUserType,
});

export type AuthUser = z.infer<typeof TAuthUser>;

export const TTelegramSignUpRequestBody = z.object({
  telegramId: z.string(),
  name: z.string(),
  bio: z.string(),
  picture: z.string(),
  interest: z.array(z.string()),
});

export type TelegramSignUpRequestBody = z.infer<typeof TTelegramSignUpRequestBody>;
