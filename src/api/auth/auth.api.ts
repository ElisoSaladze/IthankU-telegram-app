import { retrieveLaunchParams } from '@telegram-apps/sdk';

import { request } from '~/lib/request';
import { TAuthUser, TelegramSignUpRequestBody } from './auth.schema';

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

  return await request('/api/auth/telegram').post({ query }, TAuthUser);
};

export type RefreshTokenInput = {
  refreshToken: string;
};

export const refreshToken = async ({ refreshToken }: RefreshTokenInput) => {
  return await request('/auth/refreshToken').post(
    {
      body: {
        token: refreshToken,
      },
    },
    TAuthUser,
  );
};

export const telegramSignUp = async (body: TelegramSignUpRequestBody) => {
  return await request('/auth/telegram').post(
    {
      body,
    },
    TAuthUser,
  );
};

type UpdateUserBioInput = {
  bio: string;
};

export const updateUserBio = async (body: UpdateUserBioInput) => {
  return await request('/users/bio').post({
    body,
  });
};

type UpdateLocationVisibilityInput = {
  isPrivate: boolean;
};

export const updateLocationVisibility = async (body: UpdateLocationVisibilityInput) => {
  return await request('/users/location').post({
    body,
  });
};

type UpdateAccountVisibilityInput = {
  isPrivate: boolean;
};

export const updateAccountVisibility = async (body: UpdateAccountVisibilityInput) => {
  return await request('/users/privacy').patch({
    body,
  });
};

type ChangePfpInput = {
  picture: string;
};

export const changePfp = async ({ picture }: ChangePfpInput) => {
  return await request('/users').patch({
    body: {
      picture,
    },
  });
};

export type ChangeNameInput = {
  name: string;
};

export const changeName = async ({ name }: ChangeNameInput) => {
  return await request('/users').patch({
    body: {
      name,
    },
  });
};
