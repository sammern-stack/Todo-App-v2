import type { Document } from "mongoose";

export type TodoSchema = {
  title: string;
  isComplete: boolean;
} & Document;

export type TodoFilters = { isComplete?: boolean | "true" | "false" };
export type TodoCreateBody = Pick<TodoSchema, "title">;
export type TodoUpdateBody = Partial<Pick<TodoSchema, "title" | "isComplete">>;
