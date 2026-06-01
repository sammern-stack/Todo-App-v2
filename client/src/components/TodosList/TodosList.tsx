//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useTodosStore } from "../../stores";
import type { Filter } from "../../stores/useTodosStore";

import { TodoItem } from "../TodoItem/TodoItem";

import "./TodosList.scss";

//—————————————————————————————————————————————————————————————————
//* Todos List Component
//—————————————————————————————————————————————————————————————————

export const TodosList = () => {
  const todos = useTodosStore((s) => s.todos);
  const todosLeft = useTodosStore((s) => s.todosLeft);
  const clearTodos = useTodosStore((s) => s.clearTodos);

  return (
    <div className="todos">
      <div className="todos__content">
        <div className="todos__list">
          {todos.map((todo) => (
            <>
              <TodoItem todo={todo} />
              <div className="todos__divider"></div>
            </>
          ))}
        </div>

        <div className="todos__actions">
          <div className="todos__items-left">{todosLeft} items left</div>

          <div className="todos__filters">
            <FilterItem label="All" />
            <FilterItem label="Active" />
            <FilterItem label="Completed" />
          </div>

          <div className="todos__clear-all" onClick={() => clearTodos()}>
            Clear completed
          </div>
        </div>
      </div>
    </div>
  );
};

//—————————————————————————————————————————————————————————————————
// Helper
//—————————————————————————————————————————————————————————————————

const FilterItem = ({ label }: { label: Filter }) => {
  const filter = useTodosStore((s) => s.filter);
  const setFilter = useTodosStore((s) => s.setFilter);

  const handleSelectFilter = (filter: Filter) => {
    setFilter(filter);
  };

  return (
    <div
      className={`todos__filter ${filter === label ? "todos__filter--active" : ""}`}
      onClick={() => handleSelectFilter(label)}
    >
      {label}
    </div>
  );
};
