import { useMemo } from "react";
import { useFiltersStore } from "@/features/filters";
import type { TodoFilters } from "@/shared/types/todo.types";

export const useBuildTodosQuery = () => {
  const filters = useFiltersStore((s) => s.filters);
  return useMemo<TodoFilters | undefined>(
    () =>
      filters === "All" ? undefined : { isComplete: filters === "Completed" },
    [filters],
  );
};
