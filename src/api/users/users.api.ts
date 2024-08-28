import { request } from '~/lib/request';
import { GetCurrentUserResponse, LocationQueryParams, TListingApiResponse, TMapingApiResponse } from './users.schema';

export type GetUsersInput = {
  page?: number;
  radius?: string;
  shade?: string;
  hashtag?: string;
  userLocation?: {
    lat: number,
    lng: number,
  } 
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

  return await request('/users/listing').get({ query }, TListingApiResponse);
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

  return await request('/users/nearby').get({ query }, TMapingApiResponse);
};
