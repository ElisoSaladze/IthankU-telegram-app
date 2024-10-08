import { z } from 'zod';

export const TShade = z.object({
  id: z.string(),
  color: z.string(),
  en: z.string(),
  ka: z.string(),
  ru: z.string(),
  ua: z.string(),
});

export type Shade = z.infer<typeof TShade>;

export const TShades = z.array(TShade);
