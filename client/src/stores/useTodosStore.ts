//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { create } from "zustand";
import {
  createTodoRequest,
  deleteTodoRequest,
  getTodosRequest,
} from "../api/todoApi";
import type { ITodo } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface TodosStore {
  todos: ITodo[];

  newTodo: string;
  setNewTodo: (todo: string) => void;

  // Helper
  fetchTodos: () => Promise<ITodo[]>;

  // Actions
  setTodos: () => Promise<void>;
  createTodo: (todo: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: [],

  newTodo: "",
  setNewTodo: (newTodo) => set({ newTodo }),

  fetchTodos: async () => {
    const todos = await getTodosRequest();
    if (!todos.ok) throw new Error(todos.message);
    return todos.data;
  },

  setTodos: async () => set({ todos: await get().fetchTodos() }),

  createTodo: async (todo) => {
    const res = await createTodoRequest({ title: todo });
    if (!res.ok) return console.log(res.message);

    // Refresh Todos
    await get().setTodos();
  },

  deleteTodo: async (id) => {
    const res = await deleteTodoRequest(id);
    if (!res.ok) return console.log(res.message);

    // Refresh Todos
    await get().setTodos();
  },
}));
