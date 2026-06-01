//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useEffect } from "react";

import { useThemeStore, useTodosStore } from "../stores";

//—————————————————————————————————————————————————————————————————
// Start App hook
//—————————————————————————————————————————————————————————————————

export const useStartApp = () => {
  const theme = useThemeStore((s) => s.theme);

  const setTodos = useTodosStore((s) => s.setTodos);

  // Set theme on mount from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
