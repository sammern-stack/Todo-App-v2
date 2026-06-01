//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useTodosStore } from "../../stores";

import { Button } from "../Button/Button";

import type { ITodo } from "../../types";

import cross from "../../assets/icon-cross.svg";
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
  const deleteTodo = useTodosStore((s) => s.deleteTodo);

  return (
    <div className="todo">
      <div className="todo__info">
        <Button role="todo" isChecked={todo.stage === "complete"} />
        <span>{todo.title}</span>
      </div>

      <div className="todo__actions">
        <div
          className="todo__action todo__action--delete"
          onClick={() => deleteTodo(todo._id)}
        >
          <img src={cross} alt="A cross for deleting todos" />
        </div>
      </div>
    </div>
  );
};
