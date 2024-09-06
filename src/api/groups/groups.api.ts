import { request } from 'src/lib/request';
import { TAuthor, TGroup, TGroupDetails, TInvitationCode, TInvitations, TUserToInvite } from './groups.schema';
import { TPosts } from '../posts';
import { CreateGroupFormValues } from '~/providers/create-group-provider';
import { decodeBodyWithPagination, decodeBody } from '../common';

export const getGroups = async () => {
  return await request('/api/v1/groups').get({}, decodeBodyWithPagination(TGroup));
};

export type GroupId = {
  groupId: string;
};

export type groupUserParams = {
  groupId: string;
  page?: number;
};

export const getGroupDetails = async ({ groupId }: GroupId) => {
  return await request('/api/v1/groups/:groupId').get(
    {
      params: {
        groupId,
      },
    },
    decodeBody(TGroupDetails),
  );
};

export const getGroupMembers = async ({ groupId, page }: groupUserParams) => {
  const query = new URLSearchParams();

  if (page) {
    query.set('page', page.toString());
  }

  return await request('/api/v1/groups/:groupId/members').get(
    {
      query,
      params: {
        groupId,
      },
    },
    decodeBodyWithPagination(TAuthor),
  );
};

export const getGroupPosts = async ({ groupId }: GroupId) => {
  return await request('/api/v1/groups/:groupId/posts').get(
    {
      params: {
        groupId,
      },
    },
    decodeBody(TPosts),
  );
};

export const joinGroup = async ({ groupId }: GroupId) => {
  return request('/api/v1/groups/:groupId/join').post({
    params: {
      groupId,
    },
  });
};

export const leaveGroup = async ({ groupId }: GroupId) => {
  return request('/api/v1/groups/:groupId/leave').post({
    params: {
      groupId,
    },
  });
};

export type GetUserGroupsInput = {
  userId: string;
};

export const getUserGroups = async ({ userId }: GetUserGroupsInput) => {
  return await request('/api/v1/users/:userId/groups').get(
    {
      params: {
        userId,
      },
    },
    decodeBodyWithPagination(TGroup),
  );
};

export type GetInvitationsInput = {
  userId: string;
};

export const getInvitations = async ({ userId }: GetInvitationsInput) => {
  return await request('/api/v1/groups/invitations/:userId').get(
    {
      params: {
        userId,
      },
    },
    decodeBody(TInvitations),
  );
};

export type InviteId = {
  inviteId: string;
};

export const acceptInvitation = async ({ inviteId }: InviteId) => {
  return request('/api/v1/groups/invitations/:inviteId/accept').patch({
    params: {
      inviteId,
    },
  });
};

export const declineInvitation = async ({ inviteId }: InviteId) => {
  return request('/api/v1/groups/invitations/:inviteId/decline').patch({
    params: {
      inviteId,
    },
  });
};

export const getInvitationCode = async ({ groupId }: GroupId) => {
  return request('/api/v1/groups/:groupId/share').post(
    {
      params: {
        groupId,
      },
    },
    decodeBody(TInvitationCode),
  );
};

export type InviteUserInput = {
  groupId: string;
  inviteeId: string;
};

export const inviteUser = async ({ groupId, inviteeId }: InviteUserInput) => {
  return request('/api/v1/groups/:groupId/invite').post({
    params: {
      groupId,
    },
    body: {
      userId: inviteeId,
    },
  });
};

export const getUsersToInvite = async ({ groupId, page }: groupUserParams) => {
  const query = new URLSearchParams();

  if (page) {
    query.set('page', page.toString());
  }
  return await request('/api/v1/groups/:groupId/users-to-invite').get(
    {
      params: {
        groupId,
      },
      query,
    },
    decodeBodyWithPagination(TUserToInvite),
  );
};

export const createGroup = async (input: CreateGroupFormValues) => {
  return await request('/api/v1/groups').post({
    type: 'file',
    body: { ...input, tags: input.tags.map((tag) => tag.value) },
  });
};

export const removeUserFromGroup = async (groupId: string, userId: string) => {
  return await request('/api/v1/groups/:groupId/users/:userId').delete({
    params: {
      groupId,
      userId,
    },
  });
};
