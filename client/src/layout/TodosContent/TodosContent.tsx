import styles from "./TodosContent.module.scss";
import { TodoList } from "@/features/Todos";
import { CreateTodo, TodoActions } from "@/features/Todos";

export const TodosContent = () => {
  return (
    <div className={styles.todos}>
      <CreateTodo />
      <div className={styles.todos__content}>
        <TodoList />
        <TodoActions />
      </div>
    </div>
  );
};
