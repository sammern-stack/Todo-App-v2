import type { Document } from "mongoose";

export type TodoStage = "completed" | "incomplete";

export type TodoSchema = {
  title: string;
  stage: TodoStage;
} & Document;

export type TodoFilters = Partial<Pick<TodoSchema, "stage">>;
export type TodoCreateBody = Pick<TodoSchema, "title">;
export type TodoUpdateBody = Partial<TodoSchema>;
