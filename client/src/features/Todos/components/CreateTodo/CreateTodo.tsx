import { Button } from "@/shared/components";
import { useCreateTodo } from "@/features/Todos";
import type {
  InputChangeEvent,
  InputKeyDownEvent,
} from "@/shared/types/react.types";
import { useTodosStore } from "@/stores";
import styles from "./CreateTodo.module.scss";

export const CreateTodo = () => {
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);

  const { mutate: createTodo } = useCreateTodo();

  const handleNewTodo = () => {
    createTodo({ title: newTodo });
    setNewTodo("");
  };

  const handleCreateTodo = (e: InputChangeEvent) => setNewTodo(e.target.value);

  const handleKeyDown = (e: InputKeyDownEvent) =>
    e.key === "Enter" && handleNewTodo();

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
