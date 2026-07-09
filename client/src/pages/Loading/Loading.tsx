import styles from "./Loading.module.scss";
import { PageLayout } from "@/shared/components";

const Loading = () => {
  return (
    <PageLayout className={styles["loading-page"]}>
      <div className={styles["loading-page__content"]}>
        <div className={styles["loading-page__spinner"]}>Loading...</div>
      </div>
    </PageLayout>
  );
};

export default Loading;
