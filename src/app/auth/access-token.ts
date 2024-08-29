import { z } from 'zod';
import { TUserRole } from '~/api/auth';

export const TAccessTokenPayload = z.object({
  exp: z.number(),
  iat: z.number(),
  id: z.string(),
  role: TUserRole,
});

export type AccessTokenPayload = z.infer<typeof TAccessTokenPayload>;

export let globalAccessToken: string | null = null;

export const setGlobalAccessToken = (accessToken: string | null) => {
  globalAccessToken = accessToken;
};
