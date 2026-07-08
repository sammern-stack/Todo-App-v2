import styles from "./TodosContent.module.scss";
import { CreateTodo, TodosList } from "@/components";

export const TodosContent = () => {
  return (
    <div className={styles.todosContent}>
      <CreateTodo />

      <TodosList />
    </div>
  );
};
