import styles from "./Todo.module.scss";
import type { TodoSchema } from "@/shared/types/todo.types";

import { useState } from "react";
import { useDeleteTodo, useToggleTodo } from "../../hooks/useTodos";
import { cls } from "@/shared/utils/formatters";

import CrossIcon from "@/assets/icon-cross.svg?react";
import CheckIcon from "@/assets/icon-check.svg?react";

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

interface TodoProps {
  todo: TodoSchema;
}

export const Todo = ({ todo }: TodoProps) => {
  const { _id, title, isComplete } = todo;
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleTodo } = useToggleTodo();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const todoClassName = cls(
    styles.todo,
    isComplete && styles["todo--completed"],
    isDeleting === _id && styles["todo--deleting"],
  );

  const handleToggle = () => toggleTodo(_id);
  const handleDelete = (e: ButtonClickEvent) => {
    e.stopPropagation();
    setIsDeleting(_id);
    setTimeout(() => deleteTodo(_id), 500);
  };

  return (
    <li className={todoClassName} onClick={handleToggle}>
      <div className={styles.todo__check}>{isComplete && <CheckIcon />}</div>
      <p className={styles.todo__title}>{title}</p>
      <div className={styles.todo__actions}>
        <button className={styles.todo__delete} onClick={handleDelete}>
          <CrossIcon />
        </button>
      </div>
    </li>
  );
};
