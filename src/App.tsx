import { Suspense, useLayoutEffect } from "react";
import Routes from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import { CustomProvider } from "rsuite";
import themeMode from "./store/theme.mode";
import { useAtom } from "jotai";
import Loading from "./components/Loading/Loading.component";

export default function App() {
  const [darkMode] = useAtom(themeMode);
  useLayoutEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <CustomProvider theme={darkMode ? "dark" : "light"}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes />
        </ErrorBoundary>
      </Suspense>
    </CustomProvider>
  );
}
