import { api, apiCall } from "./axios";
import type {
  TodoSchema,
  TodoFilters,
  TodoCreateBody,
  TodoUpdateBody,
} from "@/shared/types/todo.types";
import type { RequestFn } from "@/shared/types/axios.types";

export const getTodosRequest = async (
  filter?: TodoFilters,
): RequestFn<TodoSchema[]> => apiCall(() => api.get("/", { params: filter }));

export const getTodoRequest = async (id: string): RequestFn<TodoSchema> =>
  apiCall(() => api.get(`/${id}`));

export const createTodoRequest = async (
  todo: TodoCreateBody,
): RequestFn<TodoCreateBody> => apiCall(() => api.post("/", todo));

export const updateTodoRequest = async (
  id: string,
  updates: TodoUpdateBody,
): RequestFn<TodoUpdateBody> => apiCall(() => api.put(`/${id}`, updates));

export const deleteTodoRequest = (id: string): RequestFn<void> =>
  apiCall(() => api.delete(`/${id}`));

export const clearTodosRequest = (): RequestFn<void> =>
  apiCall(() => api.patch("/clear"));
