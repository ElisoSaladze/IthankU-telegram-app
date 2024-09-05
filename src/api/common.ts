/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, ZodSchema, z } from 'zod';

export const TListPagination = z.object({
  page: z.number(),
  limit: z.number(),
});

export type ListPagination = z.infer<typeof TListPagination>;

export const TPaginationResult = z.object({
  page: z.number(),
  limit: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  hasPreviousPage: z.boolean().optional(),
  hasNextPage: z.boolean().optional(),
});

export type PaginationResult = z.infer<typeof TPaginationResult>;

export const decodeBodyWithPagination = <T extends ZodSchema<any, any>>(
  schema: T,
): ZodSchema<{ meta: PaginationResult; data: Array<T['_output']> }> => {
  return z.object({
    meta: TPaginationResult,
    data: z.array(schema),
  });
};

export const decodeBody = <T extends ZodSchema<any>>(schema: T): ZodObject<{ data: T }> => {
  return z.object({
    data: schema,
  });
};
