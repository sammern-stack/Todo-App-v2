import styles from "./ThemeSwitch.module.scss";
import { useThemeStore } from "@/stores/useThemeStore";

import MoonIcon from "@/assets/icon-moon.svg?react";
import SunIcon from "@/assets/icon-sun.svg?react";

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className={styles.themeSwitch} onClick={toggleTheme}>
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};
