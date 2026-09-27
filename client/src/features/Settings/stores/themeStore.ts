import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";
interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
    }),
    { name: "theme" },
  ),
);
