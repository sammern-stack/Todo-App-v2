import styles from "./Footer.module.scss";
import { Fragment } from "react";

export const Footer = () => {
  return (
    <Fragment>
      <p className={styles.helperText}>Drag and drop to reorder list</p>
    </Fragment>
  );
};
