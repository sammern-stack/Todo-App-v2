import api from "@/shared/lib/axiosInstance";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  TodoSchema,
  TodoCreateBody,
  TodoUpdateBody,
  TodoFilters,
} from "@/shared/types/todo.types";

const BASE_URL = "/api/todos";

export const todoApi = {
  getAll: (filters?: TodoFilters) =>
    requestHandler<TodoSchema[], TodoFilters>((params) =>
      api({ url: BASE_URL, method: "GET", params }),
    )(filters),

  getOne: (todoId: string) =>
    requestHandler<TodoSchema>(() =>
      api({ url: `${BASE_URL}/${todoId}`, method: "GET" }),
    )(),

  create: (todo: TodoCreateBody) =>
    requestHandler<TodoSchema>(() =>
      api({ url: BASE_URL, method: "POST", data: todo }),
    )(),

  update: (todoId: string, updates: TodoUpdateBody) =>
    requestHandler<TodoSchema>(() =>
      api({ url: `${BASE_URL}/${todoId}`, method: "PUT", data: updates }),
    )(),

  delete: (todoId: string) =>
    requestHandler<void>(() =>
      api({ url: `${BASE_URL}/${todoId}`, method: "DELETE" }),
    )(),

  clear: () =>
    requestHandler<void>(() =>
      api({ url: `${BASE_URL}/clear`, method: "PATCH" }),
    )(),
};
