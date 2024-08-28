import { Author } from '../groups';

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
  topHashtags?: TopHashtag[];
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

type TopHashtag = {
  hashtag: string;
  count: number;
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
  topHashtags: TopHashtag[];
  phoneNumber: string | null;
};

export type LocationQueryParams = {
  latitude: number;
  longitude: number;
  radius: number;
  area?: string;
  hashtag?: string;
};

export type UserQueryParams = {
  radius?: string;
  shade?: string;
  hashtag?: string;
};
