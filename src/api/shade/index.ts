import { get } from "src/lib/request/request";
import { ApiResponse } from "../types";

export type Shade = {
  _id: string;
  color: string;
  en: string;
  ka: string;
  ru: string;
  ua: string;
};

export type ShadesResponse = ApiResponse<Shade[]>;

export const getShades = async () => get<ShadesResponse>(`api/shades`);
