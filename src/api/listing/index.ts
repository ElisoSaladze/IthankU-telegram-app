import { get } from "src/lib/_request/request";
import {
  CurrentUser,
  ListingApiResponse,
  LocationQueryParams,
  UserQueryParams,
} from "./types";

export const getUsers = async (params?: UserQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params?.radius) {
    queryParams.append("radius", params.radius);
  }
  if (params?.shade) {
    queryParams.append("shade", params.shade);
  }
  if (params?.hashtag) {
    queryParams.append("hashtag", params.hashtag);
  }

  const queryString = queryParams.toString();
  return get<ListingApiResponse>(
    `users/listing${queryString ? `?${queryString}` : ""}`
  );
};

export const getUser = async (userId: string) =>
  get<{ status: string; user: CurrentUser }>(`users/listing/${userId}`);

export const getUsersByLocation = async (params: LocationQueryParams) => {
  const queryString = new URLSearchParams(
    params as unknown as Record<string, string>
  ).toString();

  return get<ListingApiResponse>(`users/nearby?${queryString}`);
};
