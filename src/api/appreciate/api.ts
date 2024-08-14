import { get, post } from "src/lib/request/request";
import {
  AppreciateQRCode,
  AppreciateUserInput,
  GetAppreciateQRCode,
  GetAppreciateUserInput,
} from "./types";

export const appreciateUser = async (body: AppreciateUserInput) => {
  return await post(`transactions`, body);
};

export const getAppreciateUser = async ({
  appreciateId,
}: {
  appreciateId: string;
}) => {
  return await get<AppreciateQRCode>(`appreciations/check/${appreciateId}`);
};

export const getQRCode = async (body: GetAppreciateUserInput) => {
  return await post<GetAppreciateQRCode>(`appreciations/request`, body);
};
