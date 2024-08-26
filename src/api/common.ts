/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodSchema, z } from "zod";

export const TListPagination = z.object({
  page: z.number(),
  limit: z.number(),
});

export type ListPagination = z.infer<typeof TListPagination>;

export const TPaginationResult = z.object({
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type PaginationResult = z.infer<typeof TPaginationResult>;

export const withPagination = <T extends ZodSchema<any, any>>(
  schema: T
): ZodSchema<{ meta: PaginationResult; data: Array<T["_output"]> }> => {
  return z.object({
    meta: TPaginationResult,
    data: z.array(schema),
  });
};
