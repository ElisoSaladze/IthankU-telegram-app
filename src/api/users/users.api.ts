import { request } from '~/lib/request';
import { LocationQueryParams, TCurrentUser, TMapUsers, TPublicUser, TUser } from './users.schema';
import { decodeBody, decodeBodyWithPagination } from '../common';

export type GetUsersInput = {
  page?: number;
  radius?: string;
  shadeId?: string;
  hashtag?: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
};

export const getUsers = async ({ page, radius, shadeId, hashtag }: GetUsersInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  if (radius) {
    query.set('radius', radius);
  }
  if (shadeId) {
    query.set('shadeId', shadeId);
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

export const getUsersByLocation = async ({ latitude, longitude, radius, shadeId, hashtag }: LocationQueryParams) => {
  const query = new URLSearchParams();

  query.set('latitude', String(latitude));
  query.set('longitude', String(longitude));
  query.set('radius', String(radius));

  if (shadeId) {
    query.set('shadeId', shadeId);
  }

  if (hashtag) {
    query.set('hashtag', hashtag);
  }

  return await request('/api/v1/users/nearby').get({ query }, decodeBody(TMapUsers));
};

type AddUserInterestsInput = {
  userId: string;
  interests: Array<string>;
};

export const addUserInterests = async ({ userId, interests }: AddUserInterestsInput) => {
  return await request('/api/v1/users/:userId/interests').patch({
    params: {
      userId,
    },
    body: {
      interests,
    },
  });
};
