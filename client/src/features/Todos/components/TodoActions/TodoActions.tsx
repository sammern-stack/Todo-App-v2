import styles from "./TodoActions.module.scss";
import { useClearTodos, useTodos } from "@/features/Todos";
import { TodoFilters } from "../TodoFilters/TodoFilters";

export const TodoActions = () => {
  const { data: todos = [] } = useTodos();
  const { mutate: clearTodos } = useClearTodos();
  const todosLeft = todos.filter((todo) => todo.stage === "incomplete").length;

  return (
    <div className={styles.todos__actions}>
      <div className={styles["todos__items-left"]}>{todosLeft} items left</div>

      <TodoFilters />

      <div className={styles["todos__clear-all"]} onClick={() => clearTodos()}>
        Clear completed
      </div>
    </div>
  );
};
