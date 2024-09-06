import { z } from 'zod';
import { TShade } from '../shades';

export const TAuthor = z.object({
  id: z.string(),
  name: z.string().optional(),
  picture: z.string().optional().nullable(),
});

export type Author = z.infer<typeof TAuthor>;

export const TVisibility = z.union([z.literal('PUBLIC'), z.literal('PRIVATE')]);

export type Visibility = z.infer<typeof TVisibility>;

export const TGroup = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  picture: z.string().nullable(),
  cover: z.string().nullable(),
  shade: TShade,
  tags: z.array(z.string()).optional(),
  membersCount: z.number(),
  privacy: TVisibility,
});

export type Group = z.infer<typeof TGroup>;

export const TGroupDetails = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.string().nullable(),
  cover: z.string().nullable(),
  shade: TShade,
  description: z.string(),
  tags: z.array(z.string()).optional(),
  privacy: TVisibility,
  membersCount: z.number(),
  isUserJoined: z.boolean(),
  owner: TAuthor,
});

export const TInvitation = z.object({
  id: z.string(),
  group: TGroup,
  status: z.string(),
  createdAt: z.string(),
});

export const TInvitations = z.array(TInvitation);

export const TInvitationCode = z.object({
  inviteCode: z.string(),
});

const TUserToInvite = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.string(),
});

export const TUserToInvites = z.array(TUserToInvite);
