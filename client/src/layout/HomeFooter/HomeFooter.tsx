import styles from "./HomeFooter.module.scss";

export const HomeFooter = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>Drag and drop to reorder list</p>
    </footer>
  );
};
