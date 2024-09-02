import { z } from 'zod';
import { TAuthor, TVisibility } from '../groups';

const TMedia = z.object({
  _id: z.string(),
  url: z.string(),
  filename: z.string(),
});

const TPostGroup = z.object({
  _id: z.string(),
  name: z.string(),
  groupImage: z.string().optional(),
});

export const TPost = z.object({
  _id: z.string(),
  content: z.string(),
  summary: z.string().optional(),
  preview: z.string(),
  group: TPostGroup.nullable(),
  tags: z.array(z.string()),
  images: z.array(z.string()).optional(),
  files: z.any().optional(),
  media: z.array(TMedia).optional(),
  likesCount: z.number().optional(),
  likes: z.array(TAuthor),
  createdAt: z.string(),
  updatedAt: z.string(),
  hasLiked: z.boolean().optional(),
  visibility: TVisibility,
  author: TAuthor.nullable().optional(),
});

export type Post = z.infer<typeof TPost>;

export const TPostsResponse = z.object({
  data: z.array(TPost),
});

export const TPostDetailsResponse = z.object({ data: TPost });
