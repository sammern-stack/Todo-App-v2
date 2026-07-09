import React from "react";
import styles from "./TodoList.module.scss";
import { useTodosStore } from "@/stores";
import { useTodos } from "@/features/Todos";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodoList = () => {
  const filter = useTodosStore((s) => s.filter);
  const getApiFilters = useTodosStore((s) => s.getApiFilters);
  const { data: todos = [] } = useTodos(getApiFilters(filter));

  return (
    <div className={styles.todos__list}>
      {todos.map((todo) => (
        <React.Fragment key={todo._id}>
          <TodoItem todo={todo} />
          <div className={styles.todos__divider}></div>
        </React.Fragment>
      ))}
    </div>
  );
};
