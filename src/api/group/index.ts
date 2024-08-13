import { del, get, post } from "src/lib/request/request";
import { PostsResponse } from "../post/types";
import { GroupDetailsResponse, GroupsResponse } from "./types";
import { globalAccessToken } from "src/providers/auth";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const getGroups = async () =>
  get<GroupsResponse>(`${VITE_APP_API_URL}api/groups`);

export const getGroupDetails = async (groupId: string) =>
  get<GroupDetailsResponse>(`${VITE_APP_API_URL}api/groups/${groupId}`);

export const getGroupPosts = async (groupId: string) =>
  get<PostsResponse>(`${VITE_APP_API_URL}api/posts/group/${groupId}`);

export const joinGroup = async (groupId: string) =>
  post(`${VITE_APP_API_URL}api/groups/${groupId}/join`);

export const leaveGroup = async (groupId: string) =>
  del(`${VITE_APP_API_URL}api/groups/${groupId}/leave`);

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
