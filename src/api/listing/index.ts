import { get } from "src/lib/request/request";
import { CurrentUser, ListingApiResponse } from "./types";

export const getUsers = async () => get<ListingApiResponse>(`users/listing`);

export const getUser = async (userId: string) =>
  get<{ status: string; user: CurrentUser }>(`users/listing/${userId}`);
