import { request } from '~/lib/request';

import { GetCurrentUserResponse, GetUsersInput, LocationQueryParams, TListingApiResponse } from '../users';

export const getUsers = async (params?: GetUsersInput) => {
  const query = new URLSearchParams();

  if (params?.radius) {
    query.append('radius', params.radius);
  }
  if (params?.shade) {
    query.append('shade', params.shade);
  }
  if (params?.hashtag) {
    query.append('hashtag', params.hashtag);
  }

  return request('users/listing').get({ query }, TListingApiResponse);
};

export const getUser = async (userId: string) =>
  request('users/listing').get({ params: { userId } }, GetCurrentUserResponse);

export const getUsersByLocation = async (params: LocationQueryParams) => {
  const query = new URLSearchParams(params as unknown as Record<string, string>);

  return request('users/nearby').get({ query }, TListingApiResponse);
};
