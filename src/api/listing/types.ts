import { Author } from "../post/types";

export type ListingApiResponse = {
  totalPages: number;
  totalResults: number;
  page: number;
  users: User[];
};

export type User = Author & {
  linkedAccounts: LinkedAccount[];
  hashtagCount: number | null;
  shadePoint: number | null;
  location: Location | null;
  generalRating: number;
  topShades?: TopShade[];
};

type LinkedAccount = {
  type: string;
  value: string;
};
type Location = {
  type: string;
  coordinates?: [number, number];
};

type TopShade = {
  _id: string;
  shade: string;
  points: number;
};

export type CurrentUser = Author & {
  isPrivate: boolean;
  physicalPoints: number;
  email: string;
  linkedAccounts: LinkedAccount[];
  topShades: TopShade[];
  generalRating: number;
  placemark: string;
  isLocationPublic: boolean;
  bio: string;
  topHashtags: {
    hashtag: string;
    count: number;
  }[];
};

export type LocationQueryParams = {
  latitude: number;
  longitude: number;
  radius: number;
  area?: string;
  hashtag?: string;
};
