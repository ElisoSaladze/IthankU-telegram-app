import { z } from 'zod';
import { TAuthor } from '../groups';
import { TShade } from '../shades';

const TLocation = z.object({
  type: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
});

const TTopShade = z.object({
  _id: z.string(),
  user: z.string(),
  shade: z.string(),
  points: z.number(),
  shadeInfo: TShade,
});

const TLinkedAccount = z.object({
  type: z.string(),
  value: z.string(),
});

export const TUser = z.intersection(
  TAuthor,
  z.object({
    linkedAccounts: z.array(TLinkedAccount),
    hashtagCount: z.number().nullable(),
    shadePoint: z.number().nullable(),
    location: TLocation.nullable(),
    generalRating: z.number(),
    topShades: z.array(TTopShade),
  }),
);

export type User = z.infer<typeof TUser>;

export const TListingApiResponse = z.object({
  totalPages: z.number(),
  totalResults: z.number(),
  page: z.number(),
  users: z.array(TUser),
});

export const TCurrentUser = z.intersection(
  TAuthor,
  z.object({
    isPrivate: z.boolean(),
    physicalPoints: z.number(),
    email: z.string(),
    linkedAccounts: z.array(TLinkedAccount),
    topShades: z.array(TTopShade),
    generalRating: z.number(),
    placemark: z.string().nullable(),
    location: TLocation.nullable(),
    isLocationPublic: z.boolean(),
    bio: z.string(),
    topHashtags: z.array(
      z.object({
        hashtag: z.string(),
        count: z.number(),
      }),
    ),
    phoneNumber: z.string().nullable().optional(),
  }),
);

export type CurrentUser = z.infer<typeof TCurrentUser>;

export const GetCurrentUserResponse = z.object({
  user: TCurrentUser,
});

export const TLocationQueryParams = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number(),
  area: z.string().optional(),
  hashtag: z.string().optional(),
});

export type LocationQueryParams = z.infer<typeof TLocationQueryParams>;
