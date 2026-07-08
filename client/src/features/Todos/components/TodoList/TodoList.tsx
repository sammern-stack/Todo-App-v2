import { useTodosStore } from "@/stores";
import type { Filter } from "@/stores/useTodosStore";

import { TodoItem } from "../TodoItem/TodoItem";

import styles from "./TodoList.module.scss";

export const TodoList = () => {
  const todos = useTodosStore((s) => s.todos);
  const todosLeft = useTodosStore((s) => s.todosLeft);
  const clearTodos = useTodosStore((s) => s.clearTodos);

  return (
    <div className={styles.todos}>
      <div className={styles.todos__content}>
        <div className={styles.todos__list}>
          {todos.map((todo) => (
            <>
              <TodoItem todo={todo} />
              <div className={styles.todos__divider}></div>
            </>
          ))}
        </div>

        <div className={styles.todos__actions}>
          <div className={styles["todos__items-left"]}>
            {todosLeft} items left
          </div>

          <div className={styles.todos__filters}>
            <FilterItem label="All" />
            <FilterItem label="Active" />
            <FilterItem label="Completed" />
          </div>

          <div
            className={styles["todos__clear-all"]}
            onClick={() => clearTodos()}
          >
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
      className={` ${styles.todos__filter} ${filter === label ? styles["todos__filter--active"] : ""}`}
      onClick={() => handleSelectFilter(label)}
    >
      {label}
    </div>
  );
};
