// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import Todo from "./Todo.model.js";

import { queryOptions } from "@/config/mongoose.js";

import { AppError } from "@/shared/utils/customErrors.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";

import type {
  TodoFilters,
  TodoCreateBody,
  TodoUpdateBody,
} from "./todo.types.js";

// ——— Services ————————————————————————————————————————————————————————————————————————————————————
export const getTodos = async (filters: TodoFilters) => {
  const query: Record<string, unknown> = {};
  if (filters.isComplete !== undefined) {
    query.isComplete =
      filters.isComplete === true || filters.isComplete === "true";
  }
  return Todo.find(query).sort({ createdAt: -1 }).lean();
};

export const getTodoById = async (id: string) => {
  const todo = await searchDocument(id, Todo);
  if (!todo) throw new AppError("Todo not Found", 404);
  return todo;
};

export const createTodo = async (todo: TodoCreateBody) => {
  const exists = await searchDocument({ title: todo.title }, Todo);
  if (exists) throw new AppError("Todo already exist", 409);
  return Todo.create(todo);
};

export const updateTodo = async (id: string, updates: TodoUpdateBody) => {
  const todo = await searchDocument(id, Todo);
  if (!todo) throw new AppError("Todo not found", 404);

  return Todo.findByIdAndUpdate(todo._id, updates, queryOptions);
};

export const toggleTodo = async (id: string) => {
  const todo = await searchDocument(id, Todo);
  if (!todo) throw new AppError("Todo not found", 404);

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { $set: { isComplete: !todo.isComplete } },
    queryOptions,
  );

  if (!updatedTodo) throw new AppError("Todo not found", 404);
  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const todo = await searchDocument(id, Todo);
  if (!todo) throw new AppError("Todo not found", 404);
  await Todo.findByIdAndDelete(todo._id);
};

export const clearTodos = async () => {
  await Todo.updateMany({ isComplete: true }, { $set: { isComplete: false } });
};
