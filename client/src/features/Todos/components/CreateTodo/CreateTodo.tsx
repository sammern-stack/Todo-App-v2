import styles from "./CreateTodo.module.scss";
import { useTodosStore } from "@/stores";
import { useCreateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import type {
  InputChangeEvent,
  InputKeyDownEvent,
} from "@/shared/types/react.types";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useState } from "react";

export const CreateTodo = () => {
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);

  const { mutate: createTodo, error } = useCreateTodo();

  const errorMessage = error?.message.split(":")[2]?.trim();

  const handleNewTodo = () => {
    createTodo({ title: newTodo });
    setNewTodo("");
  };

  const handleCreateTodo = (e: InputChangeEvent) => setNewTodo(e.target.value);

  const handleKeyDown = (e: InputKeyDownEvent) => {
    if (e.key === "Enter") {
      handleNewTodo();
      setNewTodoAdded(true);
      setTimeout(() => setNewTodoAdded(false), 1000);
    }
  };

  return (
    <div
      className={[
        styles["create-todo"],
        error
          ? styles["create-todo--error"]
          : newTodoAdded && styles["create-todo--success"],
      ].join(" ")}
    >
      <Button role="create" onClick={handleNewTodo} />

      <input
        type="text"
        className={styles["create-todo__input"]}
        placeholder={error ? errorMessage : "Create a new todo..."}
        value={newTodo}
        onChange={handleCreateTodo}
        onKeyDown={handleKeyDown}
      />

      {error ? (
        <div className={styles["create-todo__error"]}>
          <BiErrorCircle />
        </div>
      ) : (
        <div
          className={[
            styles["create-todo__success"],
            newTodoAdded && styles["create-todo__success--created"],
          ].join(" ")}
        >
          <BiCheckCircle />
        </div>
      )}
    </div>
  );
};
