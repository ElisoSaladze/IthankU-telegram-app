import { request } from '~/lib/request';
import { AppreciateUserInput, GetAppreciateUser, TAppreciateQRCode, TGetAppreciateQRCode } from './appreciate.schema';
import { decodeBody } from '../common';

export const appreciateUser = async (body: AppreciateUserInput) => {
  return await request('/api/v1/transactions').post({
    body,
  });
};

export type GetAppreciateUserInput = {
  appreciateId: string;
};

export const getAppreciateUser = async ({ appreciateId }: GetAppreciateUserInput) => {
  const query = new URLSearchParams();

  query.set('requestId', appreciateId);

  return await request('/api/v1/transactions/request-info').get(
    {
      query,
    },
    decodeBody(TAppreciateQRCode),
  );
};

export const getQRCode = async (body: GetAppreciateUser) => {
  return await request('/api/v1/transactions/requests').post(
    {
      body,
    },
    decodeBody(TGetAppreciateQRCode),
  );
};
