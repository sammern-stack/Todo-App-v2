import styles from "./Home.module.scss";
import { HomeFooter, HomeHeader, TodosContent } from "@/layout";
import { PageLayout } from "@/layout";

const Home = () => {
  return (
    <PageLayout className={styles.home}>
      <HomeHeader />
      <TodosContent />
      <HomeFooter />
    </PageLayout>
  );
};

export default Home;
