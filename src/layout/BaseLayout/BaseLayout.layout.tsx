import { Outlet } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import redirect from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import initStatusState, {
  isLoggedIn,
  isLoggedOut,
} from "../../store/initStatusState.store";
import Loading from "../../components/Loading/Loading.component";

export default function BaseLayout() {
  const re = redirect();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [loggedOut, setLoggedOut] = useAtom(isLoggedOut);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);

  useEffect(() => {
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (initStatus.isNew && !initStatus.isLoggedIn) re("setup");
    if (!initStatus.isNew && !initStatus.isLoggedIn) re("login");
    if (!initStatus.isNew && initStatus.isLoggedIn) re("dashboard");
  }, [initStatus]);

  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
    }
  }, [loggedOut]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
    }
  }, [loggedIn]);

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
