import { useDeleteTodo, useUpdateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";

import type { TodoSchema } from "@/shared/types/todo.types";

import cross from "@/assets/icon-cross.svg";
import styles from "./TodoItem.module.scss";

interface TodoItemProps {
  todo: TodoSchema;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const handleToggleTodoState = () => {
    updateTodo({
      todoId: todo._id,
      updates: {
        stage: todo.stage === "completed" ? "incomplete" : "completed",
      },
    });
  };

  return (
    <div
      className={`${styles.todo} ${todo.stage === "completed" ? styles["todo--completed"] : ""}`}
    >
      <div className={styles.todo__info}>
        <Button
          role="todo"
          isChecked={todo.stage === "completed"}
          onClick={handleToggleTodoState}
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
