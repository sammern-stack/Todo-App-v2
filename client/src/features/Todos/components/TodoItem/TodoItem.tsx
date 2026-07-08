import styles from "./TodoItem.module.scss";
import { useDeleteTodo, useUpdateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import cross from "@/assets/icon-cross.svg";
import type { TodoSchema } from "@/shared/types/todo.types";

export const TodoItem = ({ todo }: { todo: TodoSchema }) => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const isCompleted = todo.stage === "completed";

  const handleToggleTodoState = () =>
    updateTodo({
      todoId: todo._id,
      updates: {
        stage: isCompleted ? "incomplete" : "completed",
      },
    });

  const todoClasses = [
    styles.todo,
    isCompleted ? styles["todo--completed"] : "",
  ].join(" ");

  return (
    <div className={todoClasses}>
      <div className={styles.todo__info}>
        <Button
          role="todo"
          isChecked={isCompleted}
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
