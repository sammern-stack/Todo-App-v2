import { useTodosStore } from "@/stores";
import React from "react";
import { useClearTodos, useTodos } from "@/features/Todos";
import type { Filter } from "@/stores/useTodosStore";

import { TodoItem } from "../TodoItem/TodoItem";

import styles from "./TodoList.module.scss";

export const TodoList = () => {
  const { mutate: clearTodos } = useClearTodos();
  const filter = useTodosStore((s) => s.filter);
  const setFilter = useTodosStore((s) => s.setFilter);

  const { data: todos = [], isLoading, error } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return todo.stage === "incomplete";
    if (filter === "Completed") return todo.stage === "completed";
    return true;
  });

  const todosLeft = todos.filter((todo) => todo.stage === "incomplete").length;

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className={styles.todos}>
      <div className={styles.todos__content}>
        <div className={styles.todos__list}>
          {filteredTodos.map((todo) => (
            <React.Fragment key={todo._id}>
              <TodoItem todo={todo} />
              <div className={styles.todos__divider}></div>
            </React.Fragment>
          ))}
        </div>

        <div className={styles.todos__actions}>
          <div className={styles["todos__items-left"]}>
            {todosLeft} items left
          </div>

          <div className={styles.todos__filters}>
            <FilterItem label="All" filter={filter} setFilter={setFilter} />
            <FilterItem label="Active" filter={filter} setFilter={setFilter} />
            <FilterItem
              label="Completed"
              filter={filter}
              setFilter={setFilter}
            />
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

const FilterItem = ({
  label,
  filter,
  setFilter,
}: {
  label: Filter;
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) => {
  const handleSelectFilter = (currentFilter: Filter) =>
    setFilter(currentFilter);

  return (
    <div
      className={` ${styles.todos__filter} ${filter === label ? styles["todos__filter--active"] : ""}`}
      onClick={() => handleSelectFilter(label)}
    >
      {label}
    </div>
  );
};
