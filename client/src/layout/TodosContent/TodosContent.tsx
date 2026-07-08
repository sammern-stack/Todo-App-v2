import styles from "./TodosContent.module.scss";
import { TodoList } from "@/features/Todos/components";
import { CreateTodo } from "@/features/Todos/components";

export const TodosContent = () => {
  return (
    <div className={styles.todosContent}>
      <CreateTodo />
      <TodoList />
    </div>
  );
};
