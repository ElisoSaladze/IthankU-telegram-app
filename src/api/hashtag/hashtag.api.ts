import { request } from '~/lib/request';
import { THashtagResponse } from './hashtag.schema';

export const getHashtags = async () => {
  return await request('/api/hashtags').get({}, THashtagResponse);
};
