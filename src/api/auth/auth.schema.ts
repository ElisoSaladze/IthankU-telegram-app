import { z } from 'zod';

export const TUserRole = z.literal('USER');

export const TUserType = z.object({
  id: z.string(),
  email: z.string().optional(),
  isLocationPublic: z.boolean().optional(),
  name: z.string(),
  physicalPoints: z.number().optional(),
  picture: z.string().optional(),
  ratingPoints: z.number().optional(),
  role: z.string(),
});

export type UserType = z.infer<typeof TUserType>;

export const TAuthUser = z.object({
  user: TUserType,
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type AuthUser = z.infer<typeof TAuthUser>;

export const TTelegramSignUpRequestBody = z.object({
  telegramId: z.number(),
  name: z.string(),
  bio: z.string(),
  picture: z.string(),
  interest: z.array(z.string()),
});

export type TelegramSignUpRequestBody = z.infer<typeof TTelegramSignUpRequestBody>;
