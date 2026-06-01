//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { create } from "zustand";
import {
  clearTodosRequest,
  createTodoRequest,
  deleteTodoRequest,
  getTodoRequest,
  getTodosRequest,
  updateTodoRequest,
} from "../api/todoApi";
import type { ITodo, TStage } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

export type Filter = "All" | "Completed" | "Active";

interface TodosStore {
  todos: ITodo[];
  todosLeft: number;

  newTodo: string;
  setNewTodo: (todo: string) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;

  // Helpers
  fetchTodos: (filter?: TStage) => Promise<ITodo[]>;
  syncTodos: () => Promise<void>;

  // Actions
  setTodos: (filter?: TStage) => Promise<void>;
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
    const todos = await getTodosRequest(filter ? { stage: filter } : undefined);
    if (!todos.ok) throw new Error(todos.message);
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
    const res = await createTodoRequest({ title: todo });
    if (!res.ok) return console.log(res.message);
    await get().syncTodos();
  },

  deleteTodo: async (id) => {
    const res = await deleteTodoRequest(id);
    if (!res.ok) return console.log(res.message);
    await get().syncTodos();
  },

  toggleTodoState: async (id: string) => {
    const todo = await getTodoRequest(id);
    if (!todo.ok) return console.log(todo.message);

    await updateTodoRequest(id, {
      stage: todo.data.stage === "completed" ? "incomplete" : "completed",
    });

    await get().syncTodos();
  },

  clearTodos: async () => {
    const res = await clearTodosRequest();
    if (!res.ok) return console.log(res.message);
    await get().syncTodos();
  },
}));
