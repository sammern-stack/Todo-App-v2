import styles from "./TodoList.module.scss";
import { useState } from "react";
import { useDeleteTodo, useTodos, useToggleTodo } from "@/features/Todos";
import { useBuildTodosQuery } from "@/features/Todos";
import { Button } from "@/shared/components";
import CrossIcon from "@/assets/icon-cross.svg?react";

export const TodoList = () => {
  const [deletingTodoIds, setDeletingTodoIds] = useState<Set<string>>(
    () => new Set(),
  );
  const query = useBuildTodosQuery();
  const { data: todos = [] } = useTodos(query);
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleTodo } = useToggleTodo();

  const handleDelete = (todoId: string) => {
    setDeletingTodoIds((prev) => new Set(prev).add(todoId));
    setTimeout(() => deleteTodo(todoId), 500);
  };

  return (
    <ul className={styles.todosList}>
      {todos.map(({ _id, title, isComplete }) => (
        <li
          className={[
            styles.todo,
            isComplete ? styles["todo--completed"] : "",
            deletingTodoIds.has(_id) ? styles["todo--deleting"] : "",
          ].join(" ")}
          key={_id}
        >
          <Button
            role="todo"
            isChecked={isComplete}
            onClick={() => toggleTodo(_id)}
          />
          <p className={styles.todo__title} onClick={() => toggleTodo(_id)}>
            {title}
          </p>
          <div className={styles.todo__actions}>
            <div className={styles.todo__delete}>
              <CrossIcon onClick={() => handleDelete(_id)} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
