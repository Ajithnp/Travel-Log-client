import api from "./axios";

export const setDisableRefresh = (value: boolean = false): boolean => {
    return value
}

let refreshPromise: Promise<void> | null = null;

export async function refreshToken(): Promise<void> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = api
    .post('/auth/refresh-token', {}, { withCredentials: true })
    .then(() => void 0)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}