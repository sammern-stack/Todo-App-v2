import styles from "./Home.module.scss";
import { HomeFooter, HomeHeader, TodosContent } from "@/layout";
import { PageBackground } from "@/shared/components";

const Home = () => {
  return (
    <div className={styles.todos}>
      <PageBackground />

      <div className={styles.todos__content}>
        <HomeHeader />
        <TodosContent />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
