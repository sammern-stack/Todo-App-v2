import styles from "./Button.module.scss";
import CheckIcon from "@/assets/icon-check.svg?react";
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

  const isEmptyState = role === "create" || !isChecked;

  return (
    <button type="button" className={classes} {...props}>
      {isEmptyState ? (
        <div className={styles["button--empty-state"]}></div>
      ) : (
        <CheckIcon />
      )}
    </button>
  );
};
