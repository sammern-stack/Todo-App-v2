import axios from "axios";
import type { AxiosFn, RequestFn } from "@/shared/types/axios.types";

export const api = axios.create({ baseURL: "http://localhost:3001/api/todos" });

export const apiCall = async <T>(fn: AxiosFn<T>): RequestFn<T> => {
  try {
    const { data } = await fn();
    return { ...data };
  } catch (err) {
    console.log("Error:", err);
    return {
      ok: false,
      message: `An unexpected error occurred: ${err}`,
    };
  }
};
