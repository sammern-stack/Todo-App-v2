import styles from "./TodoActions.module.scss";
import { useClearTodos, useTodos } from "@/features/Todos";
import { TodoFilters } from "../TodoFilters/TodoFilters";

export const TodoActions = () => {
  const { data: todos = [] } = useTodos();
  const { mutate: clearTodos } = useClearTodos();

  return (
    <div className={styles.todosActions}>
      <p className={styles["todosActions__items-left"]}>
        {todos.filter((todo) => !todo.isComplete).length} items left
      </p>
      <TodoFilters />
      <button
        className={styles["todosActions__clear-all"]}
        onClick={() => clearTodos()}
      >
        Clear completed
      </button>
    </div>
  );
};
