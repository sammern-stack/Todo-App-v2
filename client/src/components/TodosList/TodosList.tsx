import { useTodosStore } from "../../stores";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodosList.scss";

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
            <div className="todos__filter">All</div>
            <div className="todos__filter">Active</div>
            <div className="todos__filter">Incomplete</div>
          </div>

          <div className="todos__clear-all" onClick={() => clearTodos()}>
            Clear completed
          </div>
        </div>
      </div>
    </div>
  );
};
