import styles from "./Home.module.scss";
import { useState } from "react";
import { PageLayout } from "@/layout";
import { cls } from "@/shared/utils/formatters";

import {
  CreateForm,
  TodoActions,
  useBuildTodosQuery,
  useDeleteTodo,
  useTodos,
  useToggleTodo,
} from "@/features/Todos";

import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import CrossIcon from "@/assets/icon-cross.svg?react";
import CheckIcon from "@/assets/icon-check.svg?react";

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const Home = () => {
  const { data: todos = [] } = useTodos(useBuildTodosQuery());
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: toggleTodo } = useToggleTodo();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [todoError, setTodoError] = useState<string | undefined>(undefined);

  const createBtnClassNames = cls(
    styles.createTodo,
    todoError && styles["createTodo--error"],
    newTodoAdded && styles["createTodo--success"],
  );

  const onNewTodo = () => {
    setNewTodoAdded(true);
    setTimeout(() => setNewTodoAdded(false), 500);
  };

  return (
    <PageLayout>
      <div className={createBtnClassNames}>
        <CreateForm onNewTodo={onNewTodo} error={[todoError, setTodoError]} />
        <div className={styles.createTodo__indicator}>
          {todoError && <BiErrorCircle />}
          {newTodoAdded && <BiCheckCircle />}
        </div>
      </div>
      <section className={styles.content}>
        <ul className={styles.todosList}>
          {todos.map(({ _id, title, isComplete }) => {
            const todoClassName = cls(
              styles.todo,
              isComplete && styles["todo--completed"],
              isDeleting === _id && styles["todo--deleting"],
            );

            const handleToggle = () => toggleTodo(_id);
            const handleDelete = (e: ButtonClickEvent) => {
              e.stopPropagation();
              setIsDeleting(_id);
              setTimeout(() => deleteTodo(_id), 500);
            };

            return (
              <li key={_id} className={todoClassName} onClick={handleToggle}>
                <div className={styles.todo__check}>
                  {isComplete && <CheckIcon />}
                </div>
                <p className={styles.todo__title}>{title}</p>
                <div className={styles.todo__actions}>
                  <button
                    className={styles.todo__delete}
                    onClick={handleDelete}
                  >
                    <CrossIcon />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <TodoActions />
      </section>
    </PageLayout>
  );
};

export default Home;
