import { z } from 'zod';

export const THashtag = z.object({
  _id: z.string(), // TODO!
  hashtag: z.string(),
  count: z.number(),
});

export type Hashtag = z.infer<typeof THashtag>;

export const THashtagResponse = z.object({
  data: z.array(THashtag),
});
