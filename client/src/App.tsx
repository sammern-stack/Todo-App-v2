//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useStartApp } from "./hooks/useStartApp";

import {
  ThemeSwitch,
  BackgroundImage,
  CreateTodo,
  TodosList,
} from "./components";

import "./App.scss";

//—————————————————————————————————————————————————————————————————
// App Component
//—————————————————————————————————————————————————————————————————

const App = () => {
  useStartApp();

  return (
    <div className="todo-app">
      <BackgroundImage />

      <div className="todo-app__content">
        <div className="todo-app__header">
          <div className="todo-app__title">TODO</div>

          <ThemeSwitch />
        </div>

        <div className="todo-app__body">
          <CreateTodo />

          <TodosList />

          <div className="todo-app__footer"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
