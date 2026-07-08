import styles from "./TodosContent.module.scss";
import { TodoList } from "@/features/Todos";
import { CreateTodo } from "@/features/Todos";

export const TodosContent = () => {
  return (
    <div className={styles.todosContent}>
      <CreateTodo />
      <TodoList />
    </div>
  );
};
