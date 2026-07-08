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
    return await todoApi.getAll(filter ? { stage: filter } : undefined);
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
    try {
      await todoApi.create({ title: todo });
      await get().syncTodos();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create todo";
      console.log(message);
    }
  },

  deleteTodo: async (id) => {
    try {
      await todoApi.delete(id);
      await get().syncTodos();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete todo";
      console.log(message);
    }
  },

  toggleTodoState: async (id: string) => {
    try {
      const todo = await todoApi.getOne(id);

      await todoApi.update(id, {
        stage: todo.stage === "completed" ? "incomplete" : "completed",
      });

      await get().syncTodos();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update todo";
      console.log(message);
    }
  },

  clearTodos: async () => {
    try {
      await todoApi.clear();
      await get().syncTodos();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to clear todos";
      console.log(message);
    }
  },
}));
