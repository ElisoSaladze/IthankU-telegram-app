import { z } from 'zod';
import { TAuthor } from '../groups';
import { TShade } from '../shades';

const TLocation = z.object({
  type: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
});


const TTopShade = z.object({
  shade: TShade,
  points: z.number(),
});

const TLinkedAccount = z.object({
  provider: z.string(),
  value: z.string(),
});

const TTopHashtag = z.object({
  name: z.string(),
  count: z.number(),
});

export type LinkedAccount = z.infer<typeof TLinkedAccount>;

export const TUser = z.intersection(
  TAuthor,
  z.object({
    shade: TShade,
    point: z.number(),
    hashtag: TTopHashtag,
  }),
);

export const TUsers = z.array(TUser);

export const TMapUser = z.object({
  id: z.string(),
  name: z.string(),
  picture: z.string().url(),
  givingRating: z.number(),
  receivingRating: z.number(),
  linkedAccounts: z.array(TLinkedAccount),
  location: TLocation,
});

export const TMapUsers = z.array(TMapUser);

export type MapUser = z.infer<typeof TMapUser>;

export type User = z.infer<typeof TUser>;

export const TPublicUser = z.intersection(
  TAuthor,
  z.object({
    bio: z.string().nullable(),
    points: z.number(), //physicalPoints
    location: TLocation.nullable(),
    ratingPoints: z.number(), //generalRating
    shadePoints: z.array(TTopShade), //topShades
    topHashtags: z.array(
      z.object({
        hashtag: z.string(),
        count: z.number(),
      }),
    ),
    linkedAccounts: z.array(TLinkedAccount),
  }),
);

export const TCurrentUser = z.intersection(
  TPublicUser,
  z.object({
    email: z.string().optional().nullable(),
    placemark: z.string().nullable(),
    isAccountPublic: z.boolean(), //isAccountPublic
    isLocationPublic: z.boolean(),
  }),
);

export type CurrentUser = z.infer<typeof TCurrentUser>;

export const TLocationQueryParams = z.object({
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number(),
  shadeId: z.string().optional(),
  hashtag: z.string().optional(),
});

export type LocationQueryParams = z.infer<typeof TLocationQueryParams>;
