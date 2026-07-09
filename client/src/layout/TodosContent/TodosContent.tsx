import styles from "./TodosContent.module.scss";
import { TodoList } from "@/features/Todos";
import { CreateTodo, TodoActions } from "@/features/Todos";

export const TodosContent = () => {
  return (
    <div className={styles.todosContent}>
      <CreateTodo />
      <div className={styles.todosContent__todos}>
        <div className={styles.todosContent__todosContent}>
          <TodoList />

          <TodoActions />
        </div>
      </div>
    </div>
  );
};
