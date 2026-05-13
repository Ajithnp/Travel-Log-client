//global flag to disable refresh token logic during logout

import api from "./axios";


export const setDisableRefresh = (value: boolean = false): boolean => {
    return value
}

// shared refresh

let refreshPromise: Promise<void> | null = null;

export async function refreshToken(): Promise<void> {
  // if a refresh is already in-flight, wait for it — don't start a second one
  if (refreshPromise) return refreshPromise;

  refreshPromise = api
    .post('/auth/refresh-token', {}, { withCredentials: true })
    .then(() => void 0)
    .finally(() => {
      refreshPromise = null; // reset lock after completion
    });

  return refreshPromise;
}