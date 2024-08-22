// export enum Visibility {
//   Private = "Private",
//   Public = "Public",
// }

// export type Author = {
//   _id: string;
//   name?: string;
//   picture?: string;
// };

// export type Media = {
//   _id: string;
//   url: string;
//   filename: string;
// };

// export type Post = {
//   _id: string;
//   content: string;
//   summary: string;
//   preview: string;
//   group: string;
//   tags: string[];
//   images?: string[];
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   files?: any[];
//   media?: Media[];
//   likesCount: number;
//   likes: Author[];
//   createdAt: string;
//   updatedAt: string;
//   hasLiked: boolean;
//   visibility: Visibility;
//   author?: Author | null;
// };

// export type PostsResponse = ApiResponse<Post[], Meta>;

export type CreatePostRequest = {
  content: string;
  summary: string;
  preview?: string;
  tags: string[];
  visibility: Visibility;
  group: string | null;
  images?: File[];
  files?: File[];
};

export type PostDetails = {
  success: boolean;
  data: Post;
};
