//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { api, apiCall } from "./axios";
import type { ITodo, RequestFn, TStage } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

export type TCreateTodo = Pick<ITodo, "title">;

//—————————————————————————————————————————————————————————————————
// Requests
//—————————————————————————————————————————————————————————————————

export const getTodosRequest = async (filter?: {
  stage: TStage;
}): RequestFn<ITodo[]> => apiCall(() => api.get("/", { params: filter }));

export const getTodoRequest = async (id: string): RequestFn<ITodo> =>
  apiCall(() => api.get(`/${id}`));

export const createTodoRequest = async (
  todo: TCreateTodo,
): RequestFn<TCreateTodo> => apiCall(() => api.post("/", todo));

export const updateTodoRequest = async (
  id: string,
  updates: Partial<ITodo>,
): RequestFn<Partial<ITodo>> => apiCall(() => api.put(`/${id}`, updates));

export const deleteTodoRequest = (id: string): RequestFn<void> =>
  apiCall(() => api.delete(`/${id}`));

export const clearTodosRequest = (): RequestFn<void> =>
  apiCall(() => api.patch("/"));
