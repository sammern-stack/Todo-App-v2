import styles from "./TodoItem.module.scss";
import { useDeleteTodo, useUpdateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import cross from "@/assets/icon-cross.svg";
import type { TodoSchema } from "@/shared/types/todo.types";

export const TodoItem = ({ todo }: { todo: TodoSchema }) => {
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
  const handleDelete = () => deleteTodo(todo._id);

  const todoClasses = [
    styles.todo,
    isCompleted ? styles["todo--completed"] : "",
  ].join(" ");

  return (
    <button className={todoClasses} onClick={handleToggleState}>
      <Button role="todo" isChecked={isCompleted} onClick={handleToggleState} />
      <p className={styles.todo__title}>{todo.title}</p>
      <div className={styles.todo__actions}>
        <button className={styles.todo__delete} onClick={handleDelete}>
          <img src={cross} alt="A cross for deleting todos" />
        </button>
      </div>
    </button>
  );
};
