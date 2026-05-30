//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import check from "../../assets/icon-check.svg";
import "./Button.scss";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type BaseBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps =
  | (BaseBtnProps & { role: "create" })
  | (BaseBtnProps & { role: "todo"; isChecked: boolean });

//—————————————————————————————————————————————————————————————————
// Button Component
//—————————————————————————————————————————————————————————————————

export const Button = (props: ButtonProps) => {
  const renderContent = () => {
    if (props.role === "create" || !props.isChecked)
      return <div className="button--empty-state"></div>;

    return <img src={check} alt="checkmark for completed todo" />;
  };

  const isTodoChecked = () =>
    props.role === "todo" && props.isChecked ? "checked" : "notChecked";

  const hasHover = () =>
    (props.role === "todo" && !props.isChecked) || props.role === "create"
      ? "hasHover"
      : "noHover";

  const classes = [
    "button",
    `button--${isTodoChecked()}`,
    `button--${hasHover()}`,
  ].join(" ");

  return (
    <button className={classes} {...props}>
      {renderContent()}
    </button>
  );
};
