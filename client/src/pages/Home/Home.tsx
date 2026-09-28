import styles from "./Home.module.scss";
import { useState } from "react";
import { PageLayout } from "@/layout";
import { FilterOptions } from "@/features/filters";
import {
  CreateForm,
  Todo,
  useBuildTodosQuery,
  useClearTodos,
  useTodos,
} from "@/features/Todos";
import { Button } from "@/shared/components";
import { cls } from "@/shared/utils/formatters";

import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

const Home = () => {
  const { data: todos = [] } = useTodos(useBuildTodosQuery());
  const { mutate: clearTodos } = useClearTodos();
  const [newTodoAdded, setNewTodoAdded] = useState(false);
  const [todoError, setTodoError] = useState<string | undefined>(undefined);

  const handleClearTodos = () => clearTodos();
  const todosLeft = todos.filter((todo) => !todo.isComplete).length;

  const onNewTodo = () => {
    setNewTodoAdded(true);
    setTimeout(() => setNewTodoAdded(false), 500);
  };

  const createTodoClassName = cls(
    styles.createTodo,
    todoError && styles["createTodo--error"],
    newTodoAdded && styles["createTodo--success"],
  );

  return (
    <PageLayout>
      <div className={createTodoClassName}>
        <CreateForm onNewTodo={onNewTodo} error={[todoError, setTodoError]} />
        <div className={styles["createTodo__indicator"]}>
          {todoError && <BiErrorCircle />}
          {newTodoAdded && <BiCheckCircle />}
        </div>
      </div>
      <section className={styles.content}>
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <Todo key={todo._id} todo={todo} />
          ))}
        </ul>
        <div className={styles.todosActions}>
          <p className={styles["todosActions__itemsLeft"]}>
            {todosLeft} items left
          </p>
          <FilterOptions />
          <Button onClick={handleClearTodos}>Clear completed</Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Home;
