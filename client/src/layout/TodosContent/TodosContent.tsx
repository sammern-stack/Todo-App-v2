import styles from "./TodosContent.module.scss";
import { TodoList } from "@/features/Todos";
import { CreateTodo, TodoActions } from "@/features/Todos";

export const TodosContent = () => {
  return (
    <main className={styles.todos}>
      <CreateTodo />
      <section className={styles.todos__content}>
        <TodoList />
        <TodoActions />
      </section>
    </main>
  );
};
