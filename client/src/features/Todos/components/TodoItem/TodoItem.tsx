import styles from "./TodoItem.module.scss";
import { useState } from "react";
import { useDeleteTodo, useUpdateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import CrossIcon from "@/assets/icon-cross.svg?react";
import type { TodoSchema } from "@/shared/types/todo.types";

export const TodoItem = ({ todo }: { todo: TodoSchema }) => {
  const [deleting, setDeleting] = useState(false);
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const isCompleted = todo.stage === "completed";

  const handleToggleState = () =>
    updateTodo({
      todoId: todo._id,
      updates: {
        stage: isCompleted ? "incomplete" : "completed",
      },
    });
  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      deleteTodo(todo._id);
    }, 500);
  };

  const todoClasses = [
    styles.todo,
    isCompleted ? styles["todo--completed"] : "",
    deleting ? styles["todo--deleting"] : "",
  ].join(" ");

  return (
    <li className={todoClasses}>
      <Button role="todo" isChecked={isCompleted} onClick={handleToggleState} />
      <p className={styles.todo__title} onClick={handleToggleState}>
        {todo.title}
      </p>
      <div className={styles.todo__actions}>
        <div className={styles.todo__delete}>
          <CrossIcon onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
};
