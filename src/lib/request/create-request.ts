/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamParseKey, generatePath } from 'react-router-dom';
import { z } from 'zod';
import { requestError } from '.';
import { createRequestBody } from './create-request-body';
import { globalAccessToken } from 'src/providers/auth';

type RequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestType = 'json' | 'file';

type RequestInput<Path extends string> = {
  headers?: Headers;
  body?: Record<string, any>;
  params?: Record<ParamParseKey<Path>, string>;
  query?: URLSearchParams;
  withoutAuth?: boolean;
  requestInit?: RequestInit;
  type?: RequestType;
};

export const createRequest = <Path extends string>(method: RequestMethods, url: Path) => {
  return async <T extends z.ZodSchema<any, any>>(input: RequestInput<Path>, schema?: T): Promise<T['_output']> => {
    const headers = new Headers(input.headers);

    const inputType = input.type ?? 'json';

    if (inputType === 'json') {
      headers.set('Content-Type', 'application/json');
    }

    if (globalAccessToken && !input.withoutAuth) {
      headers.set('Authorization', `Bearer ${globalAccessToken}`);
    }

    const requestInit = {
      method,
      body: createRequestBody(input.body, inputType),
      headers,
      ...input.requestInit,
    };

    const apiUrl = input.params ? generatePath(url, input.params) : url;

    try {
      const res = await fetch(input.query ? `${apiUrl}?${input.query}` : apiUrl, requestInit);

      if (res.status >= 500) {
        const error = await res.json();

        throw requestError({
          type: 'server',
          message: error.message,
          name: error.name,
          errors: error.errors,
        });
      }

      if (res.status >= 400) {
        const error = await res.json();

        throw requestError({
          type: 'client',
          message: error.message,
          name: error.name,
          errors: error.errors,
        });
      }

      if (schema) {
        const json = await res.json();

        const parsed = schema.safeParse(json);

        console.log({ parsed });

        if (!parsed.success) {
          const { error } = parsed;
          const errorMessages = error.issues.map((issue) => issue.message).join(', ');

          throw requestError({
            type: 'decode_error',
            message: errorMessages,
            name: error.name,
            url,
          });
        }

        return parsed.data;
      }

      return res.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw requestError({
          type: 'network',
          ...error,
        });
      }

      throw error;
    }
  };
};
