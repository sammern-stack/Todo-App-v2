import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { useStartApp } from "@/shared/hooks/useStartApp";

const HomePage = lazy(() => import("@/pages/Home/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));

const App = () => {
  useStartApp();

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
