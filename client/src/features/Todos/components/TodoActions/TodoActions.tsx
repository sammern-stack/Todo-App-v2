import styles from "./TodoActions.module.scss";
import { useClearTodos } from "@/features/Todos";
import { useFiltersStore, type Filters } from "@/features/filters";
import { Button } from "@/shared/components";

const todoFilters: Filters[] = ["All", "Active", "Completed"];

interface TodoActionsProps {
  todosLeft: number;
}

export const TodoActions = ({ todosLeft }: TodoActionsProps) => {
  const { mutate: clearTodos } = useClearTodos();
  const filters = useFiltersStore((s) => s.filters);
  const setFilters = useFiltersStore((s) => s.setFilters);

  const handleClearTodos = () => clearTodos();

  return (
    <div className={styles.todosActions}>
      <p className={styles["todosActions__items-left"]}>
        {todosLeft} items left
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
      <Button onClick={handleClearTodos}>Clear completed</Button>
    </div>
  );
};
