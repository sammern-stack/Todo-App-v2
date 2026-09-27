import { create } from "zustand";

interface TodosStore {
  newTodo: string;
  setNewTodo: (todo: string) => void;
}

export const useTodosStore = create<TodosStore>((set) => ({
  newTodo: "",
  setNewTodo: (newTodo) => set({ newTodo }),
}));
