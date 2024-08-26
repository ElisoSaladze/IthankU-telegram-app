import { request } from '~/lib/request';
import { GetCurrentUserResponse, LocationQueryParams, TListingApiResponse, TMapingApiResponse } from './users.schema';

export type GetUsersInput = {
  page: number;
  radius?: string;
  shade?: string;
  hashtag?: string;
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

  const url = `/users/listing?${query.toString()}`;

  const response = await request(url).get({}, TListingApiResponse);
  console.log(response);
  return response;
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

  const url = `/users/nearby?${query.toString()}`;

  // Make the request with the constructed URL and no need for additional `query` params
  return await request(url).get({}, TMapingApiResponse);
};
