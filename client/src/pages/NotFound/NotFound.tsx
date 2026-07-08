import { Link } from "react-router";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__title}>404</div>
      <div className={styles.notFound__message}>Page Not Found</div>
      <Link to="/" className={styles.notFound__link}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
