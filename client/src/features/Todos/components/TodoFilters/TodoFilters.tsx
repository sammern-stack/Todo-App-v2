import styles from "./TodoFilters.module.scss";
import { type Filters, useFiltersStore } from "@/features/filters";

const FILTERS: Filters[] = ["All", "Active", "Completed"];

export const TodoFilters = () => {
  const filters = useFiltersStore((s) => s.filters);
  const setFilters = useFiltersStore((s) => s.setFilters);

  return (
    <div className={styles.filters}>
      {FILTERS.map((name) => (
        <button
          key={name}
          type="button"
          className={[
            styles.filters__filter,
            filters === name ? styles["filters__filter--active"] : "",
          ].join(" ")}
          onClick={() => setFilters(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
