import { Author } from "src/api/post/types";
import { Shade } from "../shade";

export type Transaction = {
  _id: string;
  amount: number;
  shade: string;
  hashtag: string;
  itu: number;
  createdAt: string;
  comment: string;
  sender?: Author;
  receiver?: Author;
  shadeInfo: Shade;
};

export type UserTransactionsResponse = {
  status: string;
  page: number;
  results: number;
  totalResults: number;
  totalPages: number;
  data?: Transaction[];
};

export type TransactionData = {
  status: string;
  data: Transaction;
};
