//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { useEffect } from "react";

import { useThemeStore } from "../../stores";

//—————————————————————————————————————————————————————————————————
// Start App hook
//—————————————————————————————————————————————————————————————————

export const useStartApp = () => {
  const theme = useThemeStore((s) => s.theme);

  // Set theme on mount from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
};
