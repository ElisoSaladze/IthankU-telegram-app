import { retrieveLaunchParams } from '@telegram-apps/sdk';

import { request } from '~/lib/request';
import { TAuthUser, TelegramSignUpRequestBody } from './auth.schema';
import { decodeBody } from '../common';

const CURRENT_BOT = import.meta.env['VITE_APP_CURRENT_BOT'];

export const checkUser = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const query = new URLSearchParams();

  if (initDataRaw) {
    query.set('initDataRaw', initDataRaw);
  }

  if (CURRENT_BOT) {
    query.set('bot', CURRENT_BOT);
  }

  return await request('/api/v1/auth/telegram').get({ query }, decodeBody(TAuthUser));
};

export type RefreshTokenInput = {
  refreshToken: string;
};

export const refreshToken = async ({ refreshToken }: RefreshTokenInput) => {
  return await request('/api/v1/auth/refresh-token').post(
    {
      body: {
        refreshToken,
      },
    },
    decodeBody(TAuthUser),
  );
};

export const telegramSignUp = async (body: TelegramSignUpRequestBody) => {
  return await request('/api/v1/auth/telegram').post(
    {
      body,
    },
    decodeBody(TAuthUser),
  );
};

type UpdateUserBioInput = {
  bio: string;
  id: string;
};

export const updateUserBio = async ({ bio, id }: UpdateUserBioInput) => {
  return await request('/api/v1/users/:id/bio').patch({
    params: {
      id,
    },
    body: {
      bio,
    },
  });
};

type UpdateVisibilityInput = {
  id: string;
  isPrivate: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
};

export const updateLocationVisibility = async ({ id, isPrivate, location }: UpdateVisibilityInput) => {
  return await request('/api/v1/users/:id/location').patch({
    params: {
      id,
    },
    body: {
      isLocationPublic: isPrivate,
      location,
    },
  });
};

export const updateAccountVisibility = async ({ id, isPrivate }: UpdateVisibilityInput) => {
  return await request('/api/v1/users/:id/privacy').patch({
    params: {
      id,
    },
    body: {
      isPrivate,
    },
  });
};

type ChangePfpInput = {
  userId: string;
  picture: string;
};

export const changePfp = async ({ picture, userId }: ChangePfpInput) => {
  return await request('/api/v1/users/:userId/profile-picture').patch({
    params: {
      userId,
    },
    body: {
      picture,
    },
  });
};

export type ChangeNameInput = {
  name: string;
  id: string;
};

export const changeName = async ({ name, id }: ChangeNameInput) => {
  return await request('/api/v1/users/:id/name').patch({
    params: {
      id,
    },
    body: {
      name,
    },
  });
};
