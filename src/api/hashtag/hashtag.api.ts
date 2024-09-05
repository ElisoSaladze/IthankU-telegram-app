import { request } from '~/lib/request';
import { THashtags } from './hashtag.schema';
import { decodeBody } from '../common';

export const getHashtags = async () => {
  return await request('/api/v1/hashtags').get({}, decodeBody(THashtags));
};
