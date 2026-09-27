import styles from "./CreateTodo.module.scss";
import { useCreateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useState } from "react";

export const CreateTodo = () => {
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const { mutate: createTodo, error } = useCreateTodo();

  const errorMessage = error?.message.includes(":")
    ? error?.message.split(":")[2]?.trim()
    : error?.message;

  const handleNewTodo = () => {
    createTodo({ title: newTodo });
    setNewTodo("");
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
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          handleNewTodo();
          setNewTodoAdded(true);
          setTimeout(() => setNewTodoAdded(false), 1000);
        }}
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
