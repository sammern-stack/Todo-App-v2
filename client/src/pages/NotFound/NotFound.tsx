import { Link } from "react-router";
import { PageLayout } from "@/layout";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <PageLayout className={styles.notFound}>
      <div className={styles.notFound__title}>404</div>
      <div className={styles.notFound__message}>Page Not Found</div>
      <Link to="/" className={styles.notFound__link}>
        Go Back Home
      </Link>
    </PageLayout>
  );
};

export default NotFound;
