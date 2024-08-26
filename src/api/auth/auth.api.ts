import { retrieveLaunchParams } from '@telegram-apps/sdk';

import Cookies from 'universal-cookie';

import { request } from '~/lib/request';
import { TAuthUserResponse, TelegramSignUpRequestBody } from './auth.schema';

const CURRENT_BOT = import.meta.env['VITE_APP_CURRENT_BOT'];

const cookies = new Cookies();

export const checkUser = async () => {
  const { initDataRaw } = retrieveLaunchParams();

  const query = new URLSearchParams();

  if (initDataRaw) {
    query.set('initDataRaw', initDataRaw);
  }

  if (CURRENT_BOT) {
    query.set('bot', CURRENT_BOT);
  }

  return await request('/api/auth/telegram').post({ query }, TAuthUserResponse);
};

// /**
//  * Reissues a token using the refresh token stored in cookies.
//  *
//  * @returns A promise that resolves with the authentication response containing updated tokens.
//  */
export const reissueToken = async () => {
  return await request('/auth/refreshToken').post(
    {
      body: {
        token: cookies.get('refreshToken'),
      },
    },
    TAuthUserResponse,
  );
};

export const telegramSignUp = async (body: TelegramSignUpRequestBody) => {
  return await request('/auth/telegram').post(
    {
      body,
    },
    TAuthUserResponse,
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
