import { Author } from "../post/types";
import { Shade } from "../shade";

export type ListingApiResponse = {
  totalPages: number;
  totalResults: number;
  page: number;
  users: User[];
};

type Location = {
  type: string;
  coordinates?: [number, number];
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

type TopShade = {
  _id: string;
  shade: string;
  points: number;
  user: string;
  shadeInfo: Shade;
};

export type CurrentUser = Author & {
  isPrivate: boolean;
  physicalPoints: number;
  email: string;
  linkedAccounts: LinkedAccount[];
  topShades: TopShade[];
  generalRating: number;
  placemark: string;
  location: Location | null;
  isLocationPublic: boolean;
  bio: string;
  topHashtags: {
    hashtag: string;
    count: number;
  }[];
  phoneNumber: string | null;
};

export type LocationQueryParams = {
  latitude: number;
  longitude: number;
  radius: number;
  area?: string;
  hashtag?: string;
};
