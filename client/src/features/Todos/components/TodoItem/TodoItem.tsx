import styles from "./TodoItem.module.scss";
import { useState } from "react";
import { useDeleteTodo, useToggleTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import CrossIcon from "@/assets/icon-cross.svg?react";
import type { TodoSchema } from "@/shared/types/todo.types";

interface TodoItemProps {
  todo: TodoSchema;
}

export const TodoItem = ({
  todo: { _id, title, isComplete },
}: TodoItemProps) => {
  const [deleting, setDeleting] = useState(false);
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleTodo } = useToggleTodo();

  const handleToggleState = () => toggleTodo(_id);
  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => deleteTodo(_id), 500);
  };

  const todoClasses = [
    styles.todo,
    isComplete ? styles["todo--completed"] : "",
    deleting ? styles["todo--deleting"] : "",
  ].join(" ");

  return (
    <li className={todoClasses}>
      <Button role="todo" isChecked={isComplete} onClick={handleToggleState} />
      <p className={styles.todo__title} onClick={handleToggleState}>
        {title}
      </p>
      <div className={styles.todo__actions}>
        <div className={styles.todo__delete}>
          <CrossIcon onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};
