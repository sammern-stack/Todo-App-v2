import styles from "./TodoList.module.scss";
import { useTodosStore } from "@/stores";
import { useTodos } from "@/features/Todos";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = () => {
  const filter = useTodosStore((s) => s.filter);
  const getApiFilters = useTodosStore((s) => s.getApiFilters);
  const { data: todos = [] } = useTodos(getApiFilters(filter));

  return (
    <ul className={styles.todosList}>
      {todos.map((todo) => (
        <li>
          <TodoItem todo={todo} key={todo._id} />
        </li>
      ))}
    </ul>
  );
};
