import { useTodosStore } from "../../../../stores";

import { Button } from "@/shared/components";

import type { TodoSchema } from "@/shared/types/todo.types";

import cross from "@/assets/icon-cross.svg";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: TodoSchema;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteTodo = useTodosStore((s) => s.deleteTodo);
  const toggleTodoState = useTodosStore((s) => s.toggleTodoState);

  return (
    <div
      className={`${styles.todo} ${todo.stage === "completed" ? styles["todo--completed"] : ""}`}
    >
      <div className={styles.todo__info}>
        <Button
          role="todo"
          isChecked={todo.stage === "completed"}
          onClick={() => toggleTodoState(todo._id)}
        />
        <span>{todo.title}</span>
      </div>

      <div className={styles.todo__actions}>
        <div
          className={`${styles.todo__action} ${styles["todo__action--delete"]}`}
          onClick={() => deleteTodo(todo._id)}
        >
          <img src={cross} alt="A cross for deleting todos" />
        </div>
      </div>
    </div>
  );
};
