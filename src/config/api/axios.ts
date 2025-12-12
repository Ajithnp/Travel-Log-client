import axios, { type AxiosResponse } from "axios";
import qs from "qs";
import { apiConfig } from "../config";

const api = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      alert("Network error. Please check your connection.");
    }

    if (originalRequest.url.includes("/auth/refresh-token")) {      
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh-token", {}, { withCredentials: true });
        return api(originalRequest);
      } catch (error) {
        // window.location.href = "/user/login";
        return Promise.reject(error);
        // console.error("error", refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
