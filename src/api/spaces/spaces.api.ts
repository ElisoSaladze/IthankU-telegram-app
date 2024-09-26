import { request } from 'src/lib/request';
import { TAuthor, TSpace, TSpaceDetails, TInvitation, TInvitationCode, TUserToInvite } from './spaces.schema';
import { TPost } from '../posts';
import { CreateSpaceFormValues } from '~/providers/create-space-provider';
import { decodeBodyWithPagination, decodeBody } from '../common';

export const getSpaces = async () => {
  return await request('/api/v1/spaces').get({}, decodeBodyWithPagination(TSpace));
};

export type SpaceId = {
  spaceId: string;
};

export type SpaceUserParams = {
  spaceId: string;
  page?: number;
};

export const getSpaceDetails = async ({ spaceId }: SpaceId) => {
  return await request('/api/v1/spaces/:spaceId').get(
    {
      params: {
        spaceId,
      },
    },
    decodeBody(TSpaceDetails),
  );
};

export const getSpaceMembers = async ({ spaceId, page }: SpaceUserParams) => {
  const query = new URLSearchParams();

  if (page) {
    query.set('page', page.toString());
  }

  return await request('/api/v1/spaces/:spaceId/members').get(
    {
      query,
      params: {
        spaceId,
      },
    },
    decodeBodyWithPagination(TAuthor),
  );
};

export const getSpacePosts = async ({ spaceId }: SpaceId) => {
  return await request('/api/v1/spaces/:spaceId/posts').get(
    {
      params: {
        spaceId,
      },
    },
    decodeBodyWithPagination(TPost),
  );
};

export const joinSpace = async ({ spaceId }: SpaceId) => {
  return request('/api/v1/spaces/:spaceId/join').post({
    params: {
      spaceId,
    },
  });
};

export const leaveSpace = async ({ spaceId }: SpaceId) => {
  return request('/api/v1/spaces/:spaceId/leave').post({
    params: {
      spaceId,
    },
  });
};

export type GetUserSpacesInput = {
  userId: string;
};

export const getUserSpaces = async ({ userId }: GetUserSpacesInput) => {
  return await request('/api/v1/users/:userId/spaces').get(
    {
      params: {
        userId,
      },
    },
    decodeBodyWithPagination(TSpace),
  );
};

export type GetInvitationsInput = {
  userId: string;
  page?: number;
};

export const getInvitations = async ({ userId, page }: GetInvitationsInput) => {
  const query = new URLSearchParams();

  if (page) {
    query.set('page', page.toString());
  }
  return await request('/api/v1/users/:userId/invitations').get(
    {
      params: {
        userId,
      },
      query,
    },
    decodeBodyWithPagination(TInvitation),
  );
};

export type InviteResponse = {
  inviteId: string;
  status: string;
};

export const respondIntivation = async ({ inviteId, status }: InviteResponse) => {
  return request('/api/v1/spaces/invite/:inviteId/respond').post({
    params: {
      inviteId,
    },
    body: {
      status,
    },
  });
};

export const getInvitationCode = async ({ spaceId }: SpaceId) => {
  return request('/api/v1/spaces/:spaceId/share').post(
    {
      params: {
        spaceId,
      },
    },
    decodeBody(TInvitationCode),
  );
};

export type InviteUserInput = {
  spaceId: string;
  inviteeId: string;
};

export const inviteUser = async ({ spaceId, inviteeId }: InviteUserInput) => {
  return request('/api/v1/spaces/:spaceId/invite').post({
    params: {
      spaceId,
    },
    body: {
      userId: inviteeId,
    },
  });
};

export const getUsersToInvite = async ({ spaceId, page }: SpaceUserParams) => {
  const query = new URLSearchParams();

  if (page) {
    query.set('page', page.toString());
  }
  return await request('/api/v1/spaces/:spaceId/users-to-invite').get(
    {
      params: {
        spaceId,
      },
      query,
    },
    decodeBodyWithPagination(TUserToInvite),
  );
};

export const createSpace = async (input: Omit<CreateSpaceFormValues, 'shade'> & { shadeId?: string }) => {
  return await request('/api/v1/spaces').post({
    type: 'file',
    body: { ...input, tags: input.tags.map((tag) => tag.value) },
  });
};

export const removeUserFromSpace = async (spaceId: string, userId: string) => {
  return await request('/api/v1/spaces/:spaceId/users/:userId').delete({
    params: {
      spaceId,
      userId,
    },
  });
};
