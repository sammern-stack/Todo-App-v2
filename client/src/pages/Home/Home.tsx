import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import { CreateTodo, TodoActions, TodoList } from "@/features/Todos";

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
