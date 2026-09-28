import styles from "./Button.module.scss";
import { cls } from "@/shared/utils/formatters";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren & {
  variant?: "primary" | "secondary" | "selectable";
  isSelected?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const Button = ({
  variant = "primary",
  isSelected,
  children,
  ...props
}: ButtonProps) => {
  const buttonType = props.type ?? "button";
  const buttonClassNames = cls(
    styles.button,
    styles[`button--${variant}`],
    variant === "selectable" && isSelected && styles["button--selected"],
  );

  return (
    <button type={buttonType} className={buttonClassNames} {...props}>
      {children}
    </button>
  );
};
