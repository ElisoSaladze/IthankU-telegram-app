import { del, get, patch, post } from "src/lib/request/request";
import { PostsResponse } from "../post/types";
import {
  GroupDetailsResponse,
  GroupsResponse,
  InvitationsResponse,
  InviteCodeResponse,
  InviteUser,
  UsersToInviteResponse,
} from "./types";
import { globalAccessToken } from "src/providers/auth";
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
export const getGroups = async () => get<GroupsResponse>(`api/groups`);

export const getGroupDetails = async (groupId: string) =>
  get<GroupDetailsResponse>(`api/groups/${groupId}`);

export const getGroupPosts = async (groupId: string) =>
  get<PostsResponse>(`api/posts/group/${groupId}`);

export const joinGroup = async (groupId: string) =>
  post(`api/groups/${groupId}/join`);

export const leaveGroup = async (groupId: string) =>
  del(`api/groups/${groupId}/leave`);

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
