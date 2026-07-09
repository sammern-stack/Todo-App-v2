import { create } from "zustand";

export type Filter = "All" | "Completed" | "Active";
type ApiFilters = {
  stage: "incomplete" | "completed";
};

interface TodosStore {
  newTodo: string;
  setNewTodo: (todo: string) => void;

  filter: Filter;
  setFilter: (filter: Filter) => void;
  getApiFilters: (filter: Filter) => ApiFilters | undefined;
}

export const useTodosStore = create<TodosStore>((set) => ({
  newTodo: "",
  setNewTodo: (newTodo) => set({ newTodo }),

  filter: "All",
  setFilter: (filter) => set({ filter }),
  getApiFilters: (filter) => {
    if (filter === "All") return undefined;
    const stage = filter === "Active" ? "incomplete" : "completed";
    return { stage };
  },
}));
