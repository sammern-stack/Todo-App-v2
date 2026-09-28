import type { Filters } from "../../stores/filterStore";

type FilterOption = {
  filter: Filters;
};

export const todoFilterOptions: FilterOption[] = [
  {
    filter: "All",
  },
  {
    filter: "Active",
  },
  {
    filter: "Completed",
  },
];
