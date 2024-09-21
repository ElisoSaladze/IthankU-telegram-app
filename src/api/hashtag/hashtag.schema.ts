import { z } from 'zod';

export const THashtag = z.object({
  id: z.string(), // TODO!
  hashtag: z.string(),
  usageCount: z.number(),
});

export type Hashtag = z.infer<typeof THashtag>;

export const THashtags = z.array(THashtag);
