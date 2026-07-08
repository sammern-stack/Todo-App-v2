import { Button } from "@/shared/components";
import type {
  FormChangeEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import { useTodosStore } from "../../stores";
import "./CreateTodo.scss";

export const CreateTodo = () => {
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);
  const createTodo = useTodosStore((s) => s.createTodo);

  const handleNewTodo = () => {
    createTodo(newTodo);
    setNewTodo("");
  };

  const handleCreateTodo = (e: InputChangeEvent) => setNewTodo(e.target.value);

  const handleSubmit = (e: FormChangeEvent) => {
    e.preventDefault();
    handleNewTodo();
  };

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <Button type="submit" role="create" onClick={handleNewTodo} />

      <input
        type="text"
        className="create-todo__input"
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={handleCreateTodo}
      />
    </form>
  );
};
