import React from "react";
import { useTodosStore } from "@/stores";
import { useClearTodos, useTodos } from "@/features/Todos";
import { TodoFilters } from "../TodoFilters/TodoFilters";

import { TodoItem } from "../TodoItem/TodoItem";

import styles from "./TodoList.module.scss";

export const TodoList = () => {
  const { mutate: clearTodos } = useClearTodos();
  const filter = useTodosStore((s) => s.filter);

  const { data: todos = [] } = useTodos();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return todo.stage === "incomplete";
    if (filter === "Completed") return todo.stage === "completed";
    return true;
  });

  const todosLeft = todos.filter((todo) => todo.stage === "incomplete").length;

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

          <TodoFilters />

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
