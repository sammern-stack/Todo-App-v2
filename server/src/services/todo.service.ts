//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { Types } from "mongoose";

import Todo from "../models/Todo.js";
import { AppError } from "../utils/AppError.js";

import type { ITodo, TTodoStage } from "../types/index.js";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TTodoFilters = {
  stage?: TTodoStage;
};

//—————————————————————————————————————————————————————————————————
// Helper
//—————————————————————————————————————————————————————————————————

const validateId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid ID format", 400);
};

//—————————————————————————————————————————————————————————————————
// Services
//—————————————————————————————————————————————————————————————————

export const getTodos = async (filters: TTodoFilters) => {
  const query: Record<string, unknown> = {};
  if (filters.stage) query.stage = filters.stage;
  return Todo.find(query);
};

export const getTodoById = async (id: string) => {
  validateId(id);

  const todo = await Todo.findById(id);
  if (!todo) throw new AppError("Todo not Found", 404);

  return todo;
};

export const createTodo = async (todo: Pick<ITodo, "title">) => {
  const doesExist = await Todo.findOne({ title: todo.title });
  if (doesExist) throw new AppError("Todo already exist", 409);
  return Todo.create(todo);
};

export const updateTodo = async (id: string, updates: Partial<ITodo>) => {
  validateId(id);

  const todo = await Todo.findById(id);
  if (!todo) throw new AppError("Todo not found", 404);

  const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  validateId(id);

  const todo = await Todo.findById(id);
  if (!todo) throw new AppError("Todo not found", 404);

  await Todo.findByIdAndDelete(id);
};

export const clearTodos = async () => {
  await Todo.updateMany(
    { stage: "completed" },
    { $set: { stage: "incomplete" } },
  );
};
