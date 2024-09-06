import { z } from 'zod';
import { TAuthor, TVisibility } from '../groups';

const TMedia = z.object({
  id: z.string(),
  originalUrl: z.string(),
});

const TAttachment = z.object({
  id: z.string(),
  originalUrl: z.string(),
});

const TPostGroup = z.object({
  id: z.string(),
  name: z.string(),
  groupImage: z.string().optional(),
});

export const TPost = z.object({
  id: z.string(),
  content: z.string().nullable(),
  summary: z.string().optional().nullable(),
  author: TAuthor.nullable().optional(),
  group: TPostGroup.nullable(),
  preview: z.string().nullable(),
  visibility: TVisibility,
  tags: z.array(z.string()),
  media: z.array(TMedia).optional(),
  attachments: z.array(TAttachment).optional(),
  isRestricted: z.boolean(),
  likesCount: z.number().optional(),
  likes: z.array(TAuthor).optional(),
  hasLiked: z.boolean().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
});

export type Post = z.infer<typeof TPost>;

export const TPosts = z.array(TPost);
