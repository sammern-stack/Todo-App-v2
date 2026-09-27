import styles from "./TodoList.module.scss";
import { useTodos } from "@/features/Todos";
import { useBuildTodosQuery } from "@/features/Todos";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = () => {
  const query = useBuildTodosQuery();
  const { data: todos = [] } = useTodos(query);

  return (
    <ul className={styles.todosList}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo._id} />
      ))}
    </ul>
  );
};
