import { useLayoutEffect } from "react";
import Routes from "./routes/routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback/ErrorFallback.componennt";
import { CustomProvider, Loader } from "rsuite";
import themeMode from "./store/theme.mode";
import { useAtom } from "jotai";
import { isClosedServer, isRestartingServer } from "./store/server.store";
import isServerOnline from "./service/server/isServerOnline.service";

export default function App() {
  const [darkMode] = useAtom(themeMode);
  const [restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [closedServer, setClosedServer] = useAtom(isClosedServer);

  useLayoutEffect(() => {
    document.title = "Loading...";
    isServerOnline([setClosedServer, setRestartingServer]);
  }, []);

  return (
    <>
      {typeof closedServer === "boolean" && closedServer ? (
        <></>
      ) : (
        <CustomProvider theme={darkMode ? "dark" : "light"}>
          {typeof restartingServer === "boolean" && restartingServer ? (
            <Loader backdrop content="loading..." />
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes />
            </ErrorBoundary>
          )}
        </CustomProvider>
      )}
    </>
  );
}
