import { Suspense, useEffect } from "react";
import Routes from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";

export default function App() {
  useEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <Suspense fallback="loading...">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes />
      </ErrorBoundary>
    </Suspense>
  );
}
