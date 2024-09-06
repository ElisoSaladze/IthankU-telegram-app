import { request } from 'src/lib/request';
import { TShades } from './shades.schema';
import { decodeBody } from '../common';

export const getShades = async () => {
  return await request('/api/v1/shades').get({}, decodeBody(TShades));
};
