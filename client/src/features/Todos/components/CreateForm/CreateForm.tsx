import styles from "./CreateForm.module.scss";
import { useState } from "react";
import { useCreateTodo } from "../../hooks/useTodos";

type FormEvent = React.ChangeEvent<HTMLFormElement>;
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface CreateFormProps {
  onNewTodo: () => void;
  error: [string | undefined, SetState<string | undefined>];
}

export const CreateForm = ({ onNewTodo, error }: CreateFormProps) => {
  const [title, setTitle] = useState("");
  const [todoError, setTodoError] = error;
  const { mutate: createTodo } = useCreateTodo();

  const handleNewTodo = () => {
    setTodoError(undefined);
    createTodo(
      { title },
      {
        onSuccess: () => {
          onNewTodo();
          setTitle("");
        },
        onError: ({ message }) => {
          setTodoError(message.split(":")[2]?.trim() || message);
          setTimeout(() => setTodoError(undefined), 2000);
        },
      },
    );
  };

  const onSubmit = (e: FormEvent | ButtonClickEvent) => {
    e.preventDefault();
    handleNewTodo();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <button type="submit" className={styles.form__submit}>
        <div className={styles["form__submit--bg"]}></div>
      </button>
      <input
        className={styles.form__input}
        placeholder={todoError || "Create a new todo..."}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};
