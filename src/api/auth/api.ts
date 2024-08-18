import { retrieveLaunchParams } from "@telegram-apps/sdk";

import Cookies from "universal-cookie";

import { TelegramSignUpRequestBody } from "./types";
import { patch, post } from "src/lib/request/request";
import { AuthUserResponse } from "src/providers/auth";

const cookies = new Cookies();

export const checkUser = async () => {
  const { initDataRaw } = retrieveLaunchParams();
  const initDataRawEncoded = encodeURIComponent(initDataRaw || "");
  return post<AuthUserResponse>(
    `api/auth/telegram?initDataRaw=${initDataRawEncoded}`
  );
};

// /**
//  * Reissues a token using the refresh token stored in cookies.
//  *
//  * @returns A promise that resolves with the authentication response containing updated tokens.
//  */
export const reissueToken = async () =>
  post<AuthUserResponse>(`auth/refreshToken`, {
    token: cookies.get("refreshToken"),
  });

export const telegramSignUp = async (body: TelegramSignUpRequestBody) =>
  post<AuthUserResponse>(`auth/telegram`, body);

export const updateUserBio = async (body: { bio: string }) =>
  post("users/bio", body);

export const updateLocationVisibility = async (body: boolean) =>
  patch("users/location", { body });

export const updateAccountVisibility = async (body: boolean) =>
  patch("users/privacy", { body });
