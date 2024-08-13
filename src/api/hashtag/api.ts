import { get } from "src/lib/request/request";
import { ApiResponse } from "../types";

export type Hashtag = {
  _id: number;
  hashtag: string;
  count: number;
};

export type HashtagsResponse = ApiResponse<Hashtag[]>;

export const getHashtags = async () => get<HashtagsResponse>(`api/hashtags`);
