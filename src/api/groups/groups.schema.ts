import { z } from 'zod';
import { TShade } from '../shades';

export const TAuthor = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  picture: z.string().optional(),
});

export type Author = z.infer<typeof TAuthor>;

export const TGroup = z.object({
  _id: z.string(),
  name: z.string(),
  tags: z.array(z.string()).optional(),
  groupImage: z.string().optional(),
  shade: z.string(),
  membersCount: z.number(),
  shadeInfo: TShade,
});

export type Group = z.infer<typeof TGroup>;

export const TGroupsResponse = z.object({
  data: z.array(TGroup),
});

export const TVisibility = z.union([z.literal('Public'), z.literal('Private')]);

export const TGroupDetails = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  shade: z.string(),
  groupPrivacy: TVisibility,
  groupImage: z.string().optional(),
  groupCover: z.string().optional(),
  membersCount: z.number(),
  isUserJoined: z.boolean(),
  users: z.array(TAuthor).optional(),
});

export const TGroupDetailsResponse = z.object({
  data: TGroupDetails,
});

export const TInvitation = z.object({
  _id: z.string(),
  group: TGroup,
  status: z.string(),
  createdAt: z.string(),
});

export const TInvitationResponse = z.object({
  data: z.array(TInvitation),
});

export const TInvitationCodeResponse = z.object({
  data: z.object({
    inviteCode: z.string(),
  }),
});

const TUserToInvite = z.object({
  _id: z.string(),
  name: z.string(),
  picture: z.string(),
});

export const TUserToInviteResponse = z.object({
  data: z.array(TUserToInvite),
});
