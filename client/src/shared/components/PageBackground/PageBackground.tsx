import styles from "./PageBackground.module.scss";
import { useThemeStore } from "@/stores";
import lightImg from "@/assets/bg-desktop-light.jpg";
import darkImg from "@/assets/bg-desktop-dark.jpg";

export const PageBackground = () => {
  const { theme } = useThemeStore();

  const imgSrc = theme === "light" ? lightImg : darkImg;

  const imgAltContent =
    theme === "light"
      ? "mountain range with open color lighting"
      : "building with dark purple lighting";

  return (
    <div className={styles.pageBackground}>
      <img
        src={imgSrc}
        alt={imgAltContent}
        className={styles.pageBackground__image}
      />
    </div>
  );
};
