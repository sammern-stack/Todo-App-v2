// ——— Imports —————————————————————————————————————————————————————————————————————————————————————
import Todo from "./Todo.model.js";

import { queryOptions } from "@/config/mongoose.js";

import { AppError } from "@/shared/utils/customErrors.js";
import { isMongooseId } from "@/shared/utils/validators.js";

import type {
  TodoStage,
  TodoFilters,
  TodoQuery,
  TodoCreateBody,
  TodoUpdateBody,
} from "./todo.types.js";

// ——— Utilities ———————————————————————————————————————————————————————————————————————————————————————
const searchTodo = async (idOrMeta: string | TodoQuery) => {
  const isId = typeof idOrMeta === "string" && isMongooseId(idOrMeta);

  if (!isId && typeof idOrMeta !== "object")
    throw new AppError("Invalid search parameter", 400);

  const todo = isId
    ? await Todo.findById(idOrMeta)
    : await Todo.findOne(idOrMeta as TodoQuery);

  return !todo ? null : todo;
};

// ——— Services ————————————————————————————————————————————————————————————————————————————————————
export const getTodos = async (filters: TodoFilters) => {
  const query: Record<string, unknown> = {};
  if (filters.stage) query.stage = filters.stage;
  return Todo.find(query);
};

export const getTodoById = async (id: string) => {
  const todo = await searchTodo(id);
  if (!todo) throw new AppError("Todo not Found", 404);
  return todo;
};

export const createTodo = async (todo: TodoCreateBody) => {
  const exists = await searchTodo({ title: todo.title });
  if (exists) throw new AppError("Todo already exist", 409);
  return Todo.create(todo);
};

export const updateTodo = async (id: string, updates: TodoUpdateBody) => {
  const todo = await searchTodo(id);
  if (!todo) throw new AppError("Todo not found", 404);

  const updatedTodo = await Todo.findByIdAndUpdate(
    todo._id,
    updates,
    queryOptions,
  );

  return updatedTodo;
};

export const deleteTodo = async (id: string) => {
  const todo = await searchTodo(id);
  if (!todo) throw new AppError("Todo not found", 404);
  await Todo.findByIdAndDelete(todo._id);
};

export const clearTodos = async () => {
  await Todo.updateMany(
    { stage: "completed" },
    { $set: { stage: "incomplete" } },
  );
};
