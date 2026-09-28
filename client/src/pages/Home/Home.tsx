import styles from "./Home.module.scss";
import { useState } from "react";
import { PageLayout } from "@/layout";
import { cls } from "@/shared/utils/formatters";

import {
  CreateForm,
  Todo,
  TodoActions,
  useBuildTodosQuery,
  useTodos,
} from "@/features/Todos";

import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

const Home = () => {
  const { data: todos = [] } = useTodos(useBuildTodosQuery());
  const todosLeft = todos.filter((todo) => !todo.isComplete).length;
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
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </ul>
        <TodoActions todosLeft={todosLeft} />
      </section>
    </PageLayout>
  );
};

export default Home;
