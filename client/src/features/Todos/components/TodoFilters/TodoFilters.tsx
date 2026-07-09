import styles from "./TodoFilters.module.scss";
import { type Filter, useTodosStore } from "@/stores/useTodosStore";

const FILTERS: Filter[] = ["All", "Active", "Completed"];

export const TodoFilters = () => {
  const filter = useTodosStore((s) => s.filter);
  const setFilter = useTodosStore((s) => s.setFilter);

  const getFilterClasses = (filterName: Filter) =>
    [
      styles.filters__filter,
      filter === filterName ? styles["filters__filter--active"] : "",
    ].join(" ");

  return (
    <div className={styles.filters}>
      {FILTERS.map((name) => (
        <button
          key={name}
          type="button"
          className={getFilterClasses(name)}
          onClick={() => setFilter(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
