//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { Button } from "../Button/Button";
import type { ITodo } from "../../types";
import "./TodoItem.scss";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface TodoItemProps {
  todo: ITodo;
}

//—————————————————————————————————————————————————————————————————
//* Todo item Component
//—————————————————————————————————————————————————————————————————

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div className="todo">
      <div className="todo__info">
        <Button role="todo" isChecked={todo.stage === "complete"} />
        {todo.title}
      </div>

      <div className="todo__actions">
        <div className="todo__edit">E</div>

        <div className="todo-delete">D</div>
      </div>
    </div>
  );
};
