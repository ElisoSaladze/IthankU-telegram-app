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
};

export const updateUserBio = async (body: UpdateUserBioInput) => {
  return await request('/api/v1/users/bio').post({
    body,
  });
};

type UpdateLocationVisibilityInput = {
  isPrivate: boolean;
};

export const updateLocationVisibility = async (body: UpdateLocationVisibilityInput) => {
  return await request('/api/v1/users/location').post({
    body,
  });
};

type UpdateAccountVisibilityInput = {
  isPrivate: boolean;
};

export const updateAccountVisibility = async (body: UpdateAccountVisibilityInput) => {
  return await request('/api/v1/users/privacy').patch({
    body,
  });
};

type ChangePfpInput = {
  picture: string;
};

export const changePfp = async ({ picture }: ChangePfpInput) => {
  return await request('/api/v1/users').patch({
    body: {
      picture,
    },
  });
};

export type ChangeNameInput = {
  name: string;
};

export const changeName = async ({ name }: ChangeNameInput) => {
  return await request('/api/v1/users').patch({
    body: {
      name,
    },
  });
};
