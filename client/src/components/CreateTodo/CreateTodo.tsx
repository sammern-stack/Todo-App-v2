import { Button } from "../";
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

  return (
    <div className="create-todo">
      <Button role="create" onClick={handleNewTodo} />

      <input
        type="text"
        className="create-todo__input"
        placeholder="Create a new todo..."
        value={newTodo}
        onChange={({ target }) => setNewTodo(target.value)}
      />
    </div>
  );
};
