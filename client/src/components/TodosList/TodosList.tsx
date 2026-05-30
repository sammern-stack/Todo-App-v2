import type { ITodo } from "../../types";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodosList.scss";

const TODOS: ITodo[] = [
  { title: "todo-1", stage: "incomplete" },
  { title: "todo-2", stage: "incomplete" },
  { title: "todo-3", stage: "complete" },
  { title: "todo-4", stage: "complete" },
];

export const TodosList = () => {
  return (
    <div className="todos">
      <div className="todos__content">
        <div className="todos__list">
          {TODOS.map((todo) => (
            <>
              <TodoItem todo={todo} />
              <div className="todos__divider"></div>
            </>
          ))}
        </div>

        <div className="todos__actions">
          <div className="todos__items-left">X items left</div>

          <div className="todos__filters">
            <div className="todos__filter">All</div>
            <div className="todos__filter">Active</div>
            <div className="todos__filter">Incomplete</div>
          </div>

          <div className="todos__clear-all">Clear completed</div>
        </div>
      </div>
    </div>
  );
};
