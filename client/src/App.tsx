//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useStartApp } from "./hooks/useStartApp";

import { ThemeSwitch, BackgroundImage } from "./components";

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
          <div className="todo-app__input"></div>

          <div className="todo-app__todos"></div>

          <div className="todo-app__footer"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
