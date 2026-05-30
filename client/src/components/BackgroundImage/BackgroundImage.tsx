//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useThemeStore } from "../../stores/useThemeStore";

import lightImg from "../../assets/bg-desktop-light.jpg";
import darkImg from "../../assets/bg-desktop-dark.jpg";
import "./BackgroundImage.scss";

//—————————————————————————————————————————————————————————————————
// Background Image Component
//—————————————————————————————————————————————————————————————————

export const BackgroundImage = () => {
  const { theme } = useThemeStore();

  const imgSrc = theme === "light" ? lightImg : darkImg;

  const imgAltContent =
    theme === "light"
      ? "mountain range with open color lighting"
      : "building with dark purple lighting";

  return (
    <img
      src={imgSrc}
      alt={`Background image showing a ${imgAltContent}`}
      className="todo-app__main-bg-image"
    />
  );
};
