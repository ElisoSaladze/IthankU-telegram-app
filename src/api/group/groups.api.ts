import { get, patch, post } from "src/lib/_request/request";
import {
  GroupsResponse,
  InvitationsResponse,
  InviteCodeResponse,
  InviteUser,
  UsersToInviteResponse,
} from "./types";
import { globalAccessToken } from "src/providers/auth";
import { request } from "src/lib/request";
import { TGroupDetailsResponse, TGroupsResponse } from "./groups.schema";
import { TPostResponse } from "../posts";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const getGroups = async () => {
  return await request("/api/groups").get({}, TGroupsResponse);
};

export type GroupId = {
  groupId: string;
};

export const getGroupDetails = async ({ groupId }: GroupId) => {
  return await request("/api/groups/:groupId").get(
    {
      params: {
        groupId,
      },
    },
    TGroupDetailsResponse
  );
};

export const getGroupPosts = async ({ groupId }: GroupId) => {
  return await request("/api/posts/group/:groupId").get(
    {
      params: {
        groupId,
      },
    },
    TPostResponse
  );
};

export const joinGroup = async ({ groupId }: GroupId) => {
  return request("api/groups/:groupId/join").post({
    params: {
      groupId,
    },
  });
};

export const leaveGroup = async ({ groupId }: GroupId) => {
  return request("api/groups/:groupId/leave").post({
    params: {
      groupId,
    },
  });
};

export const userGroups = async () => get<GroupsResponse>(`users/groups`);

export const getInvitations = async (userId: string) =>
  get<InvitationsResponse>(`api/groups/invitations/${userId}`);

export const acceptInvitation = async (inviteId: string) =>
  patch(`api/groups/invitations/${inviteId}/accept`);

export const declineInvitation = async (inviteId: string) =>
  patch(`api/groups/invitations/${inviteId}/decline`);

export const getInvitationCode = async (groupId: string) =>
  post<InviteCodeResponse>(`api/groups/${groupId}/share`);

export const inviteUser = async (body: InviteUser) =>
  post("api/groups/invite", body);

export const getUsersToInvite = async (groupId: string) =>
  get<UsersToInviteResponse>(`api/groups/${groupId}/users-to-invite`);

export const createGroup = async (body: FormData) => {
  try {
    const response = await fetch(`${VITE_APP_API_URL}api/groups`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${globalAccessToken}`,
      },
      body: body,
      // No need to set Content-Type header for FormData; the browser will set it automatically
    });

    if (!response.ok) {
      // Read and log error response body
      const errorDetails = await response.text();

      console.error("Error details:", errorDetails);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse and return the JSON response if successful
    return response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
