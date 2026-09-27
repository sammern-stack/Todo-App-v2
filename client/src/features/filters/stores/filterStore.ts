import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Filters = "All" | "Completed" | "Active";

interface FilterStore {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export const useFiltersStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: "All",
      setFilters: (filters) => set({ filters }),
    }),
    { name: "filters", partialize: (s) => ({ filters: s.filters }) },
  ),
);
