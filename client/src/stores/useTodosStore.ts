import { create } from "zustand";

export type Filter = "All" | "Completed" | "Active";

interface TodosStore {
  newTodo: string;
  setNewTodo: (todo: string) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;
}

export const useTodosStore = create<TodosStore>((set) => ({
  newTodo: "",
  setNewTodo: (newTodo) => set({ newTodo }),

  filter: "All",
  setFilter: (filter) => set({ filter }),
}));
