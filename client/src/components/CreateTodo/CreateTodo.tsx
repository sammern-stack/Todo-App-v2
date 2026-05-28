import { Button } from "../";
import "./CreateTodo.scss";

export const CreateTodo = () => {
  return (
    <div className="create-todo">
      <Button />

      <input
        type="text"
        className="create-todo__input"
        placeholder="Create a new todo..."
      />
    </div>
  );
};
