import { request } from '~/lib/request';
import { TCreatePostResponse, TPost } from './posts.schema';
import { decodeBody, decodeBodyWithPagination } from '../common';
import { PostType } from '~/constants/enums';

export type GetPostsInput = {
  page: number;
};

export const getPosts = async ({ page }: GetPostsInput) => {
  const query = new URLSearchParams();

  query.set('page', String(page));

  return await request('/api/v1/posts').get({ query }, decodeBodyWithPagination(TPost));
};

export type GetPostDetailsInput = {
  postId: string;
};

export const getPost = async ({ postId }: GetPostDetailsInput) => {
  return await request('/api/v1/posts/:postId').get(
    {
      params: {
        postId,
      },
    },
    decodeBody(TPost),
  );
};

export const viewPrivatePost = async ({ postId }: GetPostDetailsInput) => {
  return await request('/api/v1/posts/:postId/unlock').post({
    params: {
      postId,
    },
  });
};

type CreatePostInput = {
  content: string;
  spaceId: string | null;
  summary: string;
  preview?: string;
  visibility: PostType;
  tags: Array<string>;
  media: Array<File>;
  attachments: Array<File>;
};

export const createPost = async (input: CreatePostInput) => {
  return await request('/api/v1/posts').post(
    {
      type: 'file',
      body: input,
    },
    decodeBody(TCreatePostResponse),
  );
};
