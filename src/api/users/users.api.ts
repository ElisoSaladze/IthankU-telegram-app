import { request } from '~/lib/request';
import { GetCurrentUserResponse, LocationQueryParams, TListingApiResponse } from './users.schema';

export type GetUsersInput = {
  page: number;
};

export const getUsers = async ({ page }: GetUsersInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  return await request('/users/listing').get({}, TListingApiResponse);
};

export type GetUserInput = {
  userId: string;
};

export const getUser = async ({ userId }: GetUserInput) => {
  return await request('/users/listing/:userId').get(
    {
      params: {
        userId,
      },
    },
    GetCurrentUserResponse,
  );
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

  return await request('/users/nearby').get(
    {
      query,
    },
    TListingApiResponse,
  );
};
