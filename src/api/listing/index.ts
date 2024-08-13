import { get } from "src/lib/request/request";
import { CurrentUser, ListingApiResponse } from "./types";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const getUsers = async () =>
  get<ListingApiResponse>(`${VITE_APP_API_URL}users/listing`);

export const getUser = async (userId: string) =>
  get<{ status: string; user: CurrentUser }>(
    `${VITE_APP_API_URL}users/listing/${userId}`
  );
