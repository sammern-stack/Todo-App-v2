import styles from "./HomeFooter.module.scss";

export const HomeFooter = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__text}>Drag and drop to reorder list</div>
      </div>
    </div>
  );
};
