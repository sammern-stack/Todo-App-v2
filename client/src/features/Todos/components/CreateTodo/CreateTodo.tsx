import styles from "./CreateTodo.module.scss";
import { useCreateTodo } from "@/features/Todos";
import { Button } from "@/shared/components";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { useState } from "react";

export const CreateTodo = () => {
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [title, setTitle] = useState("");
  const [todoError, setTodoError] = useState("");
  const { mutate: createTodo } = useCreateTodo();

  const handleNewTodo = () => {
    setTodoError("");
    createTodo(
      { title },
      {
        onError: ({ message }) => {
          setTodoError(message.split(":")[2]?.trim() || message);
        },
      },
    );
    setTitle("");
  };

  return (
    <div
      className={[
        styles["create-todo"],
        todoError
          ? styles["create-todo--error"]
          : newTodoAdded && styles["create-todo--success"],
      ].join(" ")}
    >
      <Button role="create" onClick={handleNewTodo} />

      <input
        type="text"
        className={styles["create-todo__input"]}
        placeholder={todoError || "Create a new todo..."}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          handleNewTodo();
          setNewTodoAdded(true);
          setTimeout(() => setNewTodoAdded(false), 1000);
        }}
      />

      {todoError ? (
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
