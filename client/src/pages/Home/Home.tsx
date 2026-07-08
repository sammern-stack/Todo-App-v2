import styles from "./Home.module.scss";
import { HomeFooter, HomeHeader, TodosContent } from "@/layout";
import { BackgroundImage } from "@/components";

const Home = () => {
  return (
    <div className={styles.todos}>
      <BackgroundImage />

      <div className={styles.todos__content}>
        <HomeHeader />
        <TodosContent />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
