import { z } from 'zod';
import { TAuthor } from '../groups';

const TNotificationType = z.union([
  z.literal('LIKE'),
  z.literal('TRANSACTION'),
  z.literal('GROUP_INVITE'),
  z.literal('NEW_GROUP_POST'),
]);

export type NotificationType = z.infer<typeof TNotificationType>;

export const TNotification = z.object({
  id: z.string(),
  isRead: z.boolean(),
  author: TAuthor,
  post: z
    .object({
      id: z.string(),
      summary: z.string(),
    })
    .nullable(),
  group: z
    .object({
      id: z.string(),
      name: z.string(),
      picture: z.string().nullable(),
    })
    .nullable(),
  // TODO!!
  transaction: z.any(),
  content: z.string(),
  createdAt: z.string(),
  type: TNotificationType,
});

export type Notification = z.infer<typeof TNotification>;

export const TNotifications = z.array(TNotification);
