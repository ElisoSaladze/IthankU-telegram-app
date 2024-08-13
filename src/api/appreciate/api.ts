import { get, post } from "src/lib/request/request";
import {
  AppreciateQRCode,
  AppreciateUserInput,
  GetAppreciateUserInput,
} from "./types";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const appreciateUser = async (body: AppreciateUserInput) => {
  return await post(`${VITE_APP_API_URL}transactions`, body);
};

export const getAppreciateUser = async ({
  appreciateId,
}: GetAppreciateUserInput) => {
  return await get<AppreciateQRCode>(
    `${VITE_APP_API_URL}appreciations/check/${appreciateId}`
  );
};
