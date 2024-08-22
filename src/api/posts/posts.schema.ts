import { z } from "zod";
import { TAuthor, TVisibility } from "../group";

const TMedia = z.object({
  _id: z.string(),
  url: z.string(),
  filename: z.string(),
});

export const TPost = z.object({
  _id: z.string(),
  content: z.string(),
  summary: z.string(),
  preview: z.string(),
  group: z.string(),
  tags: z.array(z.string()),
  images: z.array(z.string()).optional(),
  files: z.any(),
  media: z.array(TMedia).optional(),
  likesCount: z.number(),
  likes: z.array(TAuthor),
  createdAt: z.string(),
  updatedAt: z.string(),
  hasLiked: z.boolean(),
  visibility: TVisibility,
  author: TAuthor.nullable().optional(),
});

export type Post = z.infer<typeof TPost>;

export const TPostResponse = z.object({ data: z.array(TPost) });
