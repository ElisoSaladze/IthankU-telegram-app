import { request } from '~/lib/request';
import { LocationQueryParams, TCurrentUser, TMapUsers, TPublicUser, TUser } from './users.schema';
import { decodeBody, decodeBodyWithPagination } from '../common';

export type GetUsersInput = {
  page?: number;
  radius?: string;
  shade?: string;
  hashtag?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
};

export const getUsers = async ({ page, radius, shade, hashtag }: GetUsersInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  if (radius) {
    query.set('radius', radius);
  }
  if (shade) {
    query.set('shade', shade);
  }
  if (hashtag) {
    query.set('hashtag', hashtag);
  }

  return await request('/api/v1/users/listing').get({ query }, decodeBodyWithPagination(TUser));
};

export type GetUserInput = {
  userId: string;
};

export const getUserDetails = async ({ userId }: GetUserInput) => {
  return await request('/api/v1/users/:userId').get(
    {
      params: {
        userId,
      },
    },
    decodeBody(TPublicUser),
  );
};

export const getCurrentUser = async () => {
  return await request('/api/v1/users/me').get({}, decodeBody(TCurrentUser));
};

export const getUsersByLocation = async ({ latitude, longitude, radius, area, hashtag }: LocationQueryParams) => {
  const query = new URLSearchParams();

  query.set('latitude', String(latitude));
  query.set('longitude', String(longitude));
  query.set('radius', String(radius));

  if (area) {
    query.set('area', area);
  }

  if (hashtag) {
    query.set('hashtag', hashtag);
  }

  return await request('/api/v1/users/nearby').get({ query }, decodeBody(TMapUsers));
};
