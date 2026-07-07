// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import type { Request, Response } from "express";

import * as todoService from "./todo.service.js";

import { sendSuccess } from "@/shared/utils/apiResponse.js";
import { AppError } from "@/shared/utils/AppError.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";

import type {
  GetAllRequest,
  GetOneRequest,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
} from "@/shared/types/request.types.js";
import type { TodoSchema, TodoFilters } from "./todo.types.js";

// ——— Controllers —————————————————————————————————————————————————————————————————————————————————
export const getTodos = asyncHandler(
  async (req: GetAllRequest<TodoFilters>, res: Response) => {
    const todos = await todoService.getTodos(req.query);
    sendSuccess(res, todos, 200, { total: todos.length });
  },
);

export const getTodo = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    const todo = await todoService.getTodoById(id);
    sendSuccess(res, todo);
  },
);

export const createTodo = asyncHandler(
  async (req: CreateRequest<{ title: string }>, res: Response) => {
    const todo = await todoService.createTodo(req.body);
    sendSuccess(res, todo, 201, {}, "Todo created successfully");
  },
);

export const updateTodo = asyncHandler(
  async (req: UpdateRequest<Partial<TodoSchema>>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    const todo = await todoService.updateTodo(id, req.body);
    sendSuccess(res, todo, 200, {}, "Todo updated successfully");
  },
);

export const deleteTodo = asyncHandler(
  async (req: DeleteRequest, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    await todoService.deleteTodo(id);
    sendSuccess(res, {}, 200, {}, "Todo deleted successfully");
  },
);

export const clearTodos = asyncHandler(async (req: Request, res: Response) => {
  await todoService.clearTodos();
  sendSuccess(res, {}, 200, {}, "All todos are cleared");
});
