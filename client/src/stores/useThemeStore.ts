//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { create } from "zustand";
import { persist } from "zustand/middleware";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TTheme = "dark" | "light";

interface IThemeStore {
  theme: TTheme;
  toggleTheme: () => void;
}

//—————————————————————————————————————————————————————————————————
// Theme Store
//—————————————————————————————————————————————————————————————————

export const useThemeStore = create<IThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : "light";
        set({ theme: newTheme });
      },
    }),
    { name: "theme" },
  ),
);
