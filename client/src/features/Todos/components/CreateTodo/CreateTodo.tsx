import { Button } from "@/shared/components";
import { useCreateTodo } from "@/features/Todos";
import type { InputChangeEvent } from "@/shared/types/react.types";
import { useTodosStore } from "@/stores";
import styles from "./CreateTodo.module.scss";

export const CreateTodo = () => {
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);
  // const createTodo = useTodosStore((s) => s.createTodo);

  const { mutate: createTodo } = useCreateTodo();

  const handleNewTodo = () => {
    createTodo({ title: newTodo });
    setNewTodo("");
  };

  const handleCreateTodo = (e: InputChangeEvent) => setNewTodo(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleNewTodo();
  };

  return (
    <div className={styles["create-todo"]}>
      <Button role="create" onClick={handleNewTodo} />

      <input
        type="text"
        className={styles["create-todo__input"]}
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={handleCreateTodo}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
