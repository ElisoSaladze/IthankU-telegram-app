import { get, post } from "src/lib/request/request";
import {
  AppreciateQRCode,
  AppreciateUserInput,
  GetAppreciateUserInput,
} from "./types";

export const appreciateUser = async (body: AppreciateUserInput) => {
  return await post(`transactions`, body);
};

export const getAppreciateUser = async ({
  appreciateId,
}: GetAppreciateUserInput) => {
  return await get<AppreciateQRCode>(`appreciations/check/${appreciateId}`);
};
