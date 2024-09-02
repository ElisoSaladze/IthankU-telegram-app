import { request } from '~/lib/request';
import { TPostDetailsResponse, TPost } from './posts.schema';
import { withPagination } from '../common';
import { Visibility } from '~/constants/enums';

export type GetPostsInput = {
  page: number;
};

export const getPosts = async ({ page }: GetPostsInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  return await request('/api/posts').get({ query }, withPagination(TPost));
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
  return await request('/api/posts/:postId/unlock').post({
    params: {
      postId,
    },
  });
};

type CreatePostInput = {
  content: string;
  group: string | null;
  images: Array<File>;
  summary: string;
  tags: Array<string>;
  visibility: Visibility;
  currentTag: string;
  preview?: string;
  files: Array<File>;
};

export const createPost = async (input: CreatePostInput) => {
  return await request('/api/posts').post({
    type: 'file',
    body: input,
  });
};
