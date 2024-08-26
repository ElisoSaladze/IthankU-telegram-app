import { request } from '~/lib/request';
import { AppreciateUserInput, GetAppreciateUser, TAppreciateQRCode, TGetAppreciateQRCode } from './appreciate.schema';

export const appreciateUser = async (body: AppreciateUserInput) => {
  return await request('/transactions').post({
    body,
  });
};

export type GetAppreciateUserInput = {
  appreciateId: string;
};

export const getAppreciateUser = async ({ appreciateId }: GetAppreciateUserInput) => {
  return await request('/appreciations/check/:appreciateId').get(
    {
      params: {
        appreciateId,
      },
    },
    TAppreciateQRCode,
  );
};

export const getQRCode = async (body: GetAppreciateUser) => {
  return await request('/appreciations/request').post(
    {
      body,
    },
    TGetAppreciateQRCode,
  );
};

export const appreciateWithMobile = async (body: AppreciateUserInput) => {
  return await request('/transactions/pending').post({
    body,
  });
};
