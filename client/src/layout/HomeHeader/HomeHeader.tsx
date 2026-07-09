import styles from "./HomeHeader.module.scss";
import { ThemeSwitch } from "@/features/Settings";

export const HomeHeader = () => {
  return (
    <header className={styles.homeHeader}>
      <h1 className={styles.homeHeader__title}>TODO</h1>
      <ThemeSwitch />
    </header>
  );
};
