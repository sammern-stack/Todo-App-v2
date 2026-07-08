import {
  BackgroundImage,
  ThemeSwitch,
  CreateTodo,
  TodosList,
} from "../../components";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.todos}>
      <BackgroundImage />

      <div className={styles.todos__content}>
        <div className={styles.todos__header}>
          <div className={styles.todos__title}>TODO</div>

          <ThemeSwitch />
        </div>

        <div className={styles.todos__body}>
          <CreateTodo />

          <TodosList />

          <div className={styles.todos__footer}></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
