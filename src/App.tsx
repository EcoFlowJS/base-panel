import { useEffect } from "react";
import Routes from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import { CustomProvider } from "rsuite";
import themeMode from "./store/theme.mode";
import { useAtom } from "jotai";

export default function App() {
  const [darkMode] = useAtom(themeMode);
  useEffect(() => {
    document.title = "Loading...";
  }, []);
  return (
    <CustomProvider theme={darkMode ? "dark" : "light"}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes />
      </ErrorBoundary>
    </CustomProvider>
  );
}
