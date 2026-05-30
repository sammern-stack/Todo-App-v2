//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useThemeStore } from "../../stores/useThemeStore";

import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";
import "./ThemeSwitch.scss";

//—————————————————————————————————————————————————————————————————
// Theme Switch Component
//—————————————————————————————————————————————————————————————————

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      <img
        src={theme === "light" ? sun : moon}
        alt={`icon for ${theme} theme`}
      />
    </div>
  );
};
