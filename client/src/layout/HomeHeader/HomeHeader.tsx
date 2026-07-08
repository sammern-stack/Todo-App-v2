import styles from "./HomeHeader.module.scss";
import { ThemeSwitch } from "@/components";

export const HomeHeader = () => {
  return (
    <div className={styles.homeHeader}>
      <div className={styles.homeHeader__title}>TODO</div>

      <ThemeSwitch />
    </div>
  );
};
