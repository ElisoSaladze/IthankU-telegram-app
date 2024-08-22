import { get } from "src/lib/_request/request";
import { CurrentUser, ListingApiResponse, LocationQueryParams } from "./types";

export const getUsers = async (page: number) =>
  get<ListingApiResponse>(`users/listing?page=${page}`);

export const getUser = async (userId: string) =>
  get<{ status: string; user: CurrentUser }>(`users/listing/${userId}`);

export const getUsersByLocation = async (params: LocationQueryParams) => {
  const queryString = new URLSearchParams(
    params as unknown as Record<string, string>
  ).toString();

  return get<ListingApiResponse>(`users/nearby?${queryString}`);
};
