// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import type { Request, Response } from "express";

import * as todoService from "./todo.service.js";

import { sendSuccess } from "@/shared/utils/apiResponse.js";
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

    const metaData = {
      total: todos.length,
    };

    sendSuccess(res, 200, "Todos fetched successfully", todos, metaData);
  },
);

export const getTodo = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    const todo = await todoService.getTodoById(req.params.id!);
    sendSuccess(res, 200, "Todo fetched successfully", todo);
  },
);

export const createTodo = asyncHandler(
  async (req: CreateRequest<{ title: string }>, res: Response) => {
    const todo = await todoService.createTodo(req.body);
    sendSuccess(res, 201, "Todo created successfully", todo);
  },
);

export const updateTodo = asyncHandler(
  async (req: UpdateRequest<Partial<TodoSchema>>, res: Response) => {
    const todo = await todoService.updateTodo(req.params.id!, req.body);
    sendSuccess(res, 200, "Todo updated successfully", todo);
  },
);

export const deleteTodo = asyncHandler(
  async (req: DeleteRequest, res: Response) => {
    await todoService.deleteTodo(req.params.id!);
    sendSuccess(res, 200, "Todo deleted successfully");
  },
);

export const clearTodos = asyncHandler(async (req: Request, res: Response) => {
  await todoService.clearTodos();
  sendSuccess(res, 200, "All todos are cleared");
});
