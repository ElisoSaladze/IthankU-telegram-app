import { get } from "src/lib/request/request";
import { ApiResponse } from "../types";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export type Shade = {
  _id: string;
  color: string;
  en: string;
  ka: string;
  ru: string;
  ua: string;
};

export type ShadesResponse = ApiResponse<Shade[]>;

export const getShades = async () =>
  get<ShadesResponse>(`${VITE_APP_API_URL}api/shades`);
