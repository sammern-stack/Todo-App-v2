import styles from "./Button.module.scss";
import check from "@/assets/icon-check.svg";
import type { BaseButtonProps } from "@/shared/types/react.types";

type ButtonProps = {
  role: "create" | "todo";
  isChecked?: boolean;
} & BaseButtonProps;

export const Button = ({ role, isChecked, ...props }: ButtonProps) => {
  const classes = [
    styles["button"],
    styles[`button--${isChecked ? "checked" : "notChecked"}`],
    styles[`button--${!isChecked ? "hasHover" : "noHover"}`],
  ].join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {role === "create" || !isChecked ? (
        <div className={styles["button--empty-state"]}></div>
      ) : (
        <img src={check} alt="checkmark for completed todo" />
      )}
    </button>
  );
};
