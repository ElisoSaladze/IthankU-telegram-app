import { z } from 'zod';
import { TUserRole } from '~/api/auth';

export const TAccessTokenPayload = z.object({
  userId: z.string(),
  role: TUserRole,
  iat: z.number(),
  exp: z.number(),
});

export type AccessTokenPayload = z.infer<typeof TAccessTokenPayload>;

export let globalAccessToken: string | null = null;

export const setGlobalAccessToken = (accessToken: string | null) => {
  globalAccessToken = accessToken;
};
