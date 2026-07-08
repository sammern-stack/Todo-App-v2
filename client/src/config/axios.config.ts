import type { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  withCredentials: true,
};
