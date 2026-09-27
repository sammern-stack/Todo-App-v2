export type TodoSchema = {
  _id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoFilters = Partial<Pick<TodoSchema, "isComplete">>;
export type TodoCreateBody = Pick<TodoSchema, "title">;

export type TodoUpdateBody = Partial<Pick<TodoSchema, "title" | "isComplete">>;
export type TodoUpdateParams = {
  todoId: string;
  updates: TodoUpdateBody;
};
