import type { Document } from "mongoose";

export type TodoSchema = {
  title: string;
  stage: "completed" | "incomplete";
} & Document;

export type TodoFilters = Partial<Pick<TodoSchema, "stage">>;
export type TodoCreateBody = Pick<TodoSchema, "title">;
export type TodoUpdateBody = Partial<TodoSchema>;
