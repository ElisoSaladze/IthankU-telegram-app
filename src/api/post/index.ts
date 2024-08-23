import { globalAccessToken } from "src/providers/auth";
import { PostDetails, PostsResponse } from "./types";
import { get } from "src/lib/request/request";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
export const getPosts = async (page: number) =>
  get<PostsResponse>(`api/posts?page=${page}`);

export const getPost = async (postId: string) =>
  get<PostDetails>(`api/posts/${postId}`);

export const createPost = async (body: FormData) => {
  try {
    const response = await fetch(`${VITE_APP_API_URL}api/posts`, {
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
