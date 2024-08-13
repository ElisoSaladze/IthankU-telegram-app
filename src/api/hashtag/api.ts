import { get } from "src/lib/request/request";
import { ApiResponse } from "../types";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export type Hashtag = {
  _id: number;
  hashtag: string;
  count: number;
};

export type HashtagsResponse = ApiResponse<Hashtag[]>;

export const getHashtags = async () =>
  get<HashtagsResponse>(`${VITE_APP_API_URL}api/hashtags`);
