import styles from "./TodoActions.module.scss";
import { useClearTodos, useTodos } from "@/features/Todos";
import { useFiltersStore, type Filters } from "@/features/filters";
import { Button } from "@/shared/components";

const todoFilters: Filters[] = ["All", "Active", "Completed"];

export const TodoActions = () => {
  const { data: todos = [] } = useTodos();
  const { mutate: clearTodos } = useClearTodos();
  const filters = useFiltersStore((s) => s.filters);
  const setFilters = useFiltersStore((s) => s.setFilters);

  return (
    <div className={styles.todosActions}>
      <p className={styles["todosActions__items-left"]}>
        {todos.filter((todo) => !todo.isComplete).length} items left
      </p>
      <div className={styles.filters}>
        {todoFilters.map((filter) => (
          <Button
            key={filter}
            variant="selectable"
            isSelected={filters === filter}
            onClick={() => setFilters(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <Button onClick={() => clearTodos()}>Clear completed</Button>
    </div>
  );
};
