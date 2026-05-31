//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import api, { fetchApi, type ApiFnReturn } from "./axios";
import type { ITodo, TStage } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TodosFilters = {
  stage?: TStage;
};

type TGetTodos = (filters: TodosFilters) => ApiFnReturn<ITodo[]>;
type TGetTodo = (id: string) => ApiFnReturn<ITodo>;
type TCreateTodo = (todo: ITodo) => ApiFnReturn<ITodo>;
type TUpdateTodo = (id: string, updates: Partial<ITodo>) => ApiFnReturn<ITodo>;
type TDeleteTodo = (id: string) => ApiFnReturn<void>;
type TClearTodos = () => ApiFnReturn<void>;

//—————————————————————————————————————————————————————————————————
// Fetching Todos Functions
//—————————————————————————————————————————————————————————————————

export const getTodos: TGetTodos = (filters) =>
  fetchApi(() => api.get("/todos", { params: filters }));

export const getTodo: TGetTodo = (id) =>
  fetchApi(() => api.get(`/todos/${id}`));

export const createTodo: TCreateTodo = (todo) =>
  fetchApi(() => api.post("/todos", todo));

export const updateTodo: TUpdateTodo = (id, updates) =>
  fetchApi(() => api.put(`/todos/${id}`, updates));

export const deleteTodo: TDeleteTodo = (id) =>
  fetchApi(() => api.delete(`/todos/${id}`));

export const clearTodos: TClearTodos = () =>
  fetchApi(() => api.patch(`/todos/clear`));
