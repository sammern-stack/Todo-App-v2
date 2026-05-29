//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { TStage } from "../../types";
import check from "../../assets/icon-check.svg";
import "./Button.scss";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface ButtonProps {
  isTodo?: boolean;
  stage?: TStage;
  isInput?: boolean;
}

//—————————————————————————————————————————————————————————————————
// Button Component
//—————————————————————————————————————————————————————————————————

export const Button = ({ isTodo, stage, isInput }: ButtonProps) => {
  const isDone = isTodo && stage === "complete";
  const isChecked = isDone ? "button--checked" : "";
  const showBody = stage === "incomplete" || isInput;

  return (
    <button className={`button ${isChecked}`}>
      {isDone && <img src={check} alt="checkmark for completed todo" />}
      {showBody && <div className="button__body"></div>}
    </button>
  );
};
