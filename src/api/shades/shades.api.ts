import { ApiResponse } from "../types";
import { request } from "src/lib/request";
import { TShadesResponse } from "./shades.schema";

export type Shade = {
  _id: string;
  color: string;
  en: string;
  ka: string;
  ru: string;
  ua: string;
};

export type ShadesResponse = ApiResponse<Shade[]>;

// export const getShades = async () => get<ShadesResponse>(`api/shades`);

export const getShades = async () => {
  return await request("/api/shades").get({}, TShadesResponse);
};
