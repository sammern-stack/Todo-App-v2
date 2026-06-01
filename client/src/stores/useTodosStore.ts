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
import type { ITodo } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface TodosStore {
  todos: ITodo[];
  todosLeft: number;

  newTodo: string;
  setNewTodo: (todo: string) => void;

  // Helper
  fetchTodos: () => Promise<ITodo[]>;

  // Actions
  setTodos: () => Promise<void>;
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

  fetchTodos: async () => {
    const todos = await getTodosRequest();
    if (!todos.ok) throw new Error(todos.message);
    return todos.data;
  },

  setTodos: async () => set({ todos: await get().fetchTodos() }),

  setTodosLeft: async () => {
    const todos = await get().fetchTodos();
    const left = todos.filter((todo) => todo.stage === "incomplete").length;
    set({ todosLeft: left });
  },

  createTodo: async (todo) => {
    const res = await createTodoRequest({ title: todo });
    if (!res.ok) return console.log(res.message);

    // Refresh Todos
    await get().setTodos();
    get().setTodosLeft();
  },

  deleteTodo: async (id) => {
    const res = await deleteTodoRequest(id);
    if (!res.ok) return console.log(res.message);

    // Refresh Todos
    await get().setTodos();
    get().setTodosLeft();
  },

  toggleTodoState: async (id: string) => {
    const todo = await getTodoRequest(id);
    if (!todo.ok) return console.log(todo.message);

    await updateTodoRequest(id, {
      stage: todo.data.stage === "completed" ? "incomplete" : "completed",
    });

    // Refresh Todos
    await get().setTodos();
    get().setTodosLeft();
  },

  clearTodos: async () => {
    const res = await clearTodosRequest();

    console.log(res);

    if (!res.ok) return console.log(res.message);

    // Refresh Todos
    await get().setTodos();
    get().setTodosLeft();
  },
}));
