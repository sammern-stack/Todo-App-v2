import { useThemeStore } from "@/stores/useThemeStore";

import moon from "@/assets/icon-moon.svg";
import sun from "@/assets/icon-sun.svg";
import styles from "./ThemeSwitch.module.scss";

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className={styles.themeSwitch} onClick={toggleTheme}>
      <img
        src={theme === "light" ? sun : moon}
        alt={`icon for ${theme} theme`}
      />
    </div>
  );
};
