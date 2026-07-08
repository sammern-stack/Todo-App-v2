import { create } from "zustand";
import { todoApi } from "@/features/Todos/services/todoApi";
import type { TodoSchema, TodoStage } from "@/shared/types/todo.types";

export type Filter = "All" | "Completed" | "Active";

interface TodosStore {
  todos: TodoSchema[];
  todosLeft: number;

  newTodo: string;
  setNewTodo: (todo: string) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;

  // Helpers
  fetchTodos: (filter?: TodoStage) => Promise<TodoSchema[]>;
  syncTodos: () => Promise<void>;

  // Actions
  setTodos: (filter?: TodoStage) => Promise<void>;
  setTodosLeft: () => void;
  createTodo: (todo: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodoState: (id: string) => Promise<void>;
  clearTodos: () => Promise<void>;
}

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: [],
  todosLeft: 0,

  newTodo: "",
  setNewTodo: (newTodo) => set({ newTodo }),

  filter: "All",
  setFilter: async (filter) => {
    set({ filter });
    await get().setTodos(
      filter === "Active"
        ? "incomplete"
        : filter === "Completed"
          ? "completed"
          : undefined,
    );
  },

  fetchTodos: async (filter) => {
    const todos = await todoApi.getAll(filter ? { stage: filter } : undefined);
    if (!todos.ok)
      throw new Error(todos.error?.message || "Failed to fetch todos");
    return todos.data;
  },

  syncTodos: async () => {
    await get().setTodos();
    get().setTodosLeft();
  },

  setTodos: async (filter) =>
    set({ todos: await get().fetchTodos(filter ? filter : undefined) }),

  setTodosLeft: async () => {
    const todos = await get().fetchTodos();
    const left = todos.filter((todo) => todo.stage === "incomplete").length;
    set({ todosLeft: left });
  },

  createTodo: async (todo) => {
    const res = await todoApi.create({ title: todo });
    if (!res.ok)
      return console.log(res.error?.message || "Failed to create todo");
    await get().syncTodos();
  },

  deleteTodo: async (id) => {
    const res = await todoApi.delete(id);
    if (!res.ok)
      return console.log(res.error?.message || "Failed to delete todo");
    await get().syncTodos();
  },

  toggleTodoState: async (id: string) => {
    const todo = await todoApi.getOne(id);
    if (!todo.ok)
      return console.log(todo.error?.message || "Failed to fetch todo");

    const res = await todoApi.update(id, {
      stage: todo.data.stage === "completed" ? "incomplete" : "completed",
    });
    if (!res.ok)
      return console.log(res.error?.message || "Failed to update todo");

    await get().syncTodos();
  },

  clearTodos: async () => {
    const res = await todoApi.clear();
    if (!res.ok)
      return console.log(res.error?.message || "Failed to clear todos");
    await get().syncTodos();
  },
}));
