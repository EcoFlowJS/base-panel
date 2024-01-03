import { Suspense } from "react";
import Routes from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./components/error";

export default function App() {
  return (
    <Suspense fallback="loading...">
      <ErrorBoundary FallbackComponent={Fallback}>
        <Routes />
      </ErrorBoundary>
    </Suspense>
  );
}
