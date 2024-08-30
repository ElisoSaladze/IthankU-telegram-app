import { request } from '~/lib/request';
import { TPostDetailsResponse, TPost } from './posts.schema';
import { withPagination } from '../common';
import { globalAccessToken } from '~/app/auth/access-token';

const VITE_APP_API_URL = import.meta.env['VITE_APP_API_URL'];

export type GetPostsInput = {
  page: number;
};

export const getPosts = async ({ page }: GetPostsInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  return await request('/api/posts').get({}, withPagination(TPost));
};

export type GetPostDetailsInput = {
  postId: string;
};

export const getPost = async ({ postId }: GetPostDetailsInput) => {
  return await request('/api/posts/:postId').get(
    {
      params: {
        postId,
      },
    },
    TPostDetailsResponse,
  );
};

export const viewPrivatePost = async ({ postId }: GetPostDetailsInput) => {
  return await request("/api/posts/:postId/unlock").post({
    params: {
      postId,
    },
  });
};

// TODO!
export const createPost = async (body: FormData) => {
  try {
    const response = await fetch(`${VITE_APP_API_URL}api/posts`, {
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
