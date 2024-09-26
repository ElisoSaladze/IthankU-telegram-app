import { z } from 'zod';
import { TAuthor } from '../spaces';

export const TPostTypes = z.union([z.literal('FREE'), z.literal('PAID')]);

const TMedia = z.object({
  id: z.string(),
  originalUrl: z.string(),
});

const TAttachment = z.object({
  id: z.string(),
  originalUrl: z.string(),
});

const TPostSpace = z.object({
  id: z.string(),
  name: z.string(),
  spaceImage: z.string().optional(),
});

export const TPost = z.object({
  id: z.string(),
  content: z.string().nullable(),
  summary: z.string().optional().nullable(),
  author: TAuthor.nullable().optional(),
  space: TPostSpace.nullable(),
  preview: z.string().nullable(),
  visibility: TPostTypes,
  tags: z.array(z.string()),
  media: z.array(TMedia).optional(),
  attachments: z.array(TAttachment).optional(),
  isRestricted: z.boolean().optional(),
  likesCount: z.number().optional(),
  likes: z.array(TAuthor).optional(),
  hasLiked: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type Post = z.infer<typeof TPost>;

export const TPosts = z.array(TPost);

export const TCreatePostResponse = z.object({
  // There are much more items in response but for now we only need post id!
  id: z.string(),
});
