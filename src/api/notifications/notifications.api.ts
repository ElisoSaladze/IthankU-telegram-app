import { request } from '~/lib/request';
import { decodeBody } from '../common';
import { TNotifications } from './notifications.schema';

export const getNotifications = async () => {
  return await request('/api/v1/notifications').get({}, decodeBody(TNotifications));
};
