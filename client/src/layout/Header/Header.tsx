import styles from "./Header.module.scss";
import { ThemeSwitch } from "@/features/Settings";
import { Fragment } from "react";

export const Header = () => {
  return (
    <Fragment>
      <h1 className={styles.header__title}>TODO</h1>
      <ThemeSwitch />
    </Fragment>
  );
};
