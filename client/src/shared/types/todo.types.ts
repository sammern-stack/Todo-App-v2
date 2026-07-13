export type TodoStage = "completed" | "incomplete";

export type TodoSchema = {
  _id: string;
  title: string;
  stage: TodoStage;
  createdAt: string;
  updatedAt: string;
};

export type TodoFilters = Partial<Pick<TodoSchema, "stage">>;
export type TodoCreateBody = Pick<TodoSchema, "title">;

export type TodoUpdateBody = Partial<Pick<TodoSchema, "title" | "stage">>;
export type TodoUpdateParams = {
  todoId: string;
  updates: TodoUpdateBody;
};
