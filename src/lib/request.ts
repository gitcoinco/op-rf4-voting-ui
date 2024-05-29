"use client";
import ky, { HTTPError } from "ky";
import { getToken, setToken } from "./token";

export const request = ky.extend({
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
          request.headers.set("Content-Type", "application/json");
        }
      },
    ],
    beforeRetry: [
      async ({ request, error, retryCount }) => {
        if (
          error instanceof HTTPError &&
          error.response.status === 401 &&
          retryCount === 1
        ) {
          try {
            setToken("");
            request.headers.set("Authorization", ``);
          } catch (error) {
            throw new Error("Failed to refresh token");
          }
        }
      },
    ],
  },
});
