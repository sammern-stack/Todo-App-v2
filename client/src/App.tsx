import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router";
import { useThemeStore } from "./stores";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));

const App = () => {
  const theme = useThemeStore((s) => s.theme);

  // Set theme on mount from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
