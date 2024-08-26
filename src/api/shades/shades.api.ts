import { request } from 'src/lib/request';
import { TShadesResponse } from './shades.schema';

export const getShades = async () => {
  return await request('/api/shades').get({}, TShadesResponse);
};
