import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { PageBackground } from "@/shared/components";
import { useTheme } from "@/features/Settings";

const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));
const HomePage = lazy(() => import("@/pages/Home/Home"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));

const App = () => {
  useTheme();

  return (
    <Suspense fallback={<LoadingPage />}>
      <PageBackground />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
