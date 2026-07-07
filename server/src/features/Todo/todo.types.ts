import type { Document, QueryFilter } from "mongoose";

export type TodoStage = "completed" | "incomplete";

export type TodoSchema = {
  title: string;
  stage: TodoStage;
} & Document;

export type TodoFilters = {
  stage?: TodoStage;
};

export type TodoQuery = QueryFilter<TodoSchema>;
export type TodoCreateBody = Pick<TodoSchema, "title">;
export type TodoUpdateBody = Partial<TodoSchema>;
