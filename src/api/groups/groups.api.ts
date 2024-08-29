import { request } from 'src/lib/request';
import {
  TGroupDetailsResponse,
  TGroupsResponse,
  TInvitationCodeResponse,
  TInvitationResponse,
  TUserToInviteResponse,
} from './groups.schema';
import { TPostsResponse } from '../posts';
import { globalAccessToken } from '~/app/auth/access-token';

const VITE_APP_API_URL = import.meta.env['VITE_APP_API_URL'];

export const getGroups = async () => {
  return await request('/api/groups').get({}, TGroupsResponse);
};

export type GroupId = {
  groupId: string;
};

export const getGroupDetails = async ({ groupId }: GroupId) => {
  return await request('/api/groups/:groupId').get(
    {
      params: {
        groupId,
      },
    },
    TGroupDetailsResponse,
  );
};

export const getGroupPosts = async ({ groupId }: GroupId) => {
  return await request('/api/posts/group/:groupId').get(
    {
      params: {
        groupId,
      },
    },
    TPostsResponse,
  );
};

export const joinGroup = async ({ groupId }: GroupId) => {
  return request('/api/groups/:groupId/join').post({
    params: {
      groupId,
    },
  });
};

export const leaveGroup = async ({ groupId }: GroupId) => {
  return request('/api/groups/:groupId/leave').post({
    params: {
      groupId,
    },
  });
};

export const userGroups = async () => {
  return await request('/users/groups').get({}, TGroupsResponse);
};

export type GetInvitationsInput = {
  userId: string;
};

export const getInvitations = async ({ userId }: GetInvitationsInput) => {
  return await request('/api/groups/invitations/:userId').get(
    {
      params: {
        userId,
      },
    },
    TInvitationResponse,
  );
};

export type InviteId = {
  inviteId: string;
};

export const acceptInvitation = async ({ inviteId }: InviteId) => {
  return request('/api/groups/invitations/:inviteId/accept').patch({
    params: {
      inviteId,
    },
  });
};

export const declineInvitation = async ({ inviteId }: InviteId) => {
  return request('/api/groups/invitations/:inviteId/decline').patch({
    params: {
      inviteId,
    },
  });
};

export const getInvitationCode = async ({ groupId }: GroupId) => {
  return request('/api/groups/:groupId/share').post(
    {
      params: {
        groupId,
      },
    },
    TInvitationCodeResponse,
  );
};

export type InviteUserInput = {
  groupId: string;
  inviteeId: string;
};

export const inviteUser = async ({ groupId, inviteeId }: InviteUserInput) => {
  return request('/api/groups/invite').post({
    body: {
      groupId,
      inviteeId,
    },
  });
};

export const getUsersToInvite = async ({ groupId }: GroupId) => {
  return await request('/api/groups/:groupId/users-to-invite').get(
    {
      params: {
        groupId,
      },
    },
    TUserToInviteResponse,
  );
};

// TODO!
export const createGroup = async (body: FormData) => {
  try {
    const response = await fetch(`${VITE_APP_API_URL}api/groups`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${globalAccessToken}`,
      },
      body: body,
      // No need to set Content-Type header for FormData; the browser will set it automatically
    });

    if (!response.ok) {
      // Read and log error response body
      const errorDetails = await response.text();

      console.error('Error details:', errorDetails);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse and return the JSON response if successful
    return response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
