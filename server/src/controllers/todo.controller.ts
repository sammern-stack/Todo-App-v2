//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Request, Response } from "express";

import * as todoService from "../services/todo.service.js";
import { sendSuccess, AppError, asyncHandler } from "../utils/index.js";

import type { ITodo, TTodoStage } from "../types/index.js";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TTodoParams = {
  id?: string;
};

type TFiltersQuery = {
  stage?: TTodoStage;
};

//—————————————————————————————————————————————————————————————————
// GET api/todos : Get all todos
//—————————————————————————————————————————————————————————————————

export const getTodos = asyncHandler(
  async (req: Request<{}, {}, {}, TFiltersQuery>, res: Response) => {
    const notes = await todoService.getTodos(req.query);
    sendSuccess(res, notes, 200, { total: notes.length });
  },
);

//—————————————————————————————————————————————————————————————————
// GET api/todos/:id : Get a single todo
//—————————————————————————————————————————————————————————————————

export const getTodo = asyncHandler(
  async (req: Request<TTodoParams>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    const todo = await todoService.getTodoById(id);
    sendSuccess(res, todo);
  },
);

//—————————————————————————————————————————————————————————————————
// POST api/todos : Create a new todo
//—————————————————————————————————————————————————————————————————

export const createTodo = asyncHandler(
  async (req: Request<{}, {}, { title: string }>, res: Response) => {
    const todo = await todoService.createTodo(req.body);
    sendSuccess(res, todo, 201, {}, "Todo created successfully");
  },
);

//—————————————————————————————————————————————————————————————————
// PUT api/todos/:id : Update a single todo
//—————————————————————————————————————————————————————————————————

export const updateTodo = asyncHandler(
  async (req: Request<TTodoParams, {}, Partial<ITodo>>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    const todo = await todoService.updateTodo(id, req.body);
    sendSuccess(res, todo, 200, {}, "Todo updated successfully");
  },
);

//—————————————————————————————————————————————————————————————————
// DELETE api/todos/:id : Delete a single todo
//—————————————————————————————————————————————————————————————————

export const deleteTodo = asyncHandler(
  async (req: Request<TTodoParams>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing todo id", 400);

    await todoService.deleteTodo(id);
    sendSuccess(res, {}, 204, {}, "Todo deleted successfully");
  },
);

//—————————————————————————————————————————————————————————————————
// PATCH api/todos/clear : Reset all todos to incomplete
//—————————————————————————————————————————————————————————————————

export const clearTodos = asyncHandler(async (req: Request, res: Response) => {
  await todoService.clearTodos();
  sendSuccess(res, {}, 204, {}, "All todos are cleared");
});
