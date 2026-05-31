//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { AxiosError, create } from "axios";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type ApiSuccess<T> = {
  data: T;
  meta?: Record<string, unknown>;
  message?: string;
};

type ApiError = {
  message: string;
};

export type ApiResponse<T> =
  | ({ ok: true } & ApiSuccess<T>)
  | ({ ok: false } & ApiError);

export type ApiFnReturn<T> = Promise<ApiResponse<T>>;

type TApiFn<T> = () => ApiFnReturn<T>;

//—————————————————————————————————————————————————————————————————
// Axios instance
//—————————————————————————————————————————————————————————————————

const api = create({
  baseURL: "http://localhost:3001/api",
});

//—————————————————————————————————————————————————————————————————
// Fetch API data utility function
//—————————————————————————————————————————————————————————————————

export const fetchApi = async <T>(fn: TApiFn<T>): ApiFnReturn<T> => {
  try {
    const res = await fn();

    if (res.ok) {
      return {
        ok: true,
        data: res.data,
        meta: res.meta,
        message: res.message,
      };
    }

    throw new Error(res.message);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    return {
      ok: false,
      message:
        error.response?.data?.message ||
        error.message ||
        `An unexpected error occurred: ${err}`,
    };
  }
};

export default api;
