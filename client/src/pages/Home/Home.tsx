import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import { TodoList } from "@/features/Todos";
import { CreateTodo, TodoActions } from "@/features/Todos";

const Home = () => {
  return (
    <PageLayout>
      <CreateTodo />
      <section className={styles.content}>
        <TodoList />
        <TodoActions />
      </section>
    </PageLayout>
  );
};

export default Home;
