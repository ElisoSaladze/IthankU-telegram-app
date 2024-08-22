/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalAccessToken } from "../../providers/auth";

/**
 * The HTTP request function.
 *
 * @param method The HTTP method (e.g., 'GET', 'POST', etc.).
 * @returns A function that makes an HTTP request with the specified method.
 */
type Method = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export const request =
  (method: Method) =>
  async <T>(path: string, body?: Record<string, any>): Promise<T> => {
    const result = await fetch(`${VITE_APP_API_URL}${path}`, {
      method,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${globalAccessToken}`,
      },
      body: JSON.stringify(body),
    });

    // If request is successful, parse and return the response data
    if (result.ok) {
      const data = await result.json();
      return data as T;
    } else {
      // If request fails
      // Parse the error response data
      const error = (await result.json()) as T;

      // Reject the promise with the error data
      return Promise.reject({
        ...error,
      }) as unknown as T;
    }
  };

// Functions for making specific HTTP requests
export const get = request("GET");
export const post = request("POST");
export const put = request("PUT");
export const patch = request("PATCH");
export const del = request("DELETE");
