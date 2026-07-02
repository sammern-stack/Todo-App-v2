import { Button } from "../";
import { useTodosStore } from "../../stores";
import "./CreateTodo.scss";

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const CreateTodo = () => {
  const newTodo = useTodosStore((s) => s.newTodo);
  const setNewTodo = useTodosStore((s) => s.setNewTodo);
  const createTodo = useTodosStore((s) => s.createTodo);

  const handleNewTodo = () => {
    createTodo(newTodo);
    setNewTodo("");
  };

  const handleCreateTodo = (e: InputEvent) => setNewTodo(e.target.value);

  return (
    <form
      className="create-todo"
      onSubmit={(e) => {
        e.preventDefault();
        handleNewTodo();
      }}
    >
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
