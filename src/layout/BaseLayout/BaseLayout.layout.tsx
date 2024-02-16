import { Outlet } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import redirect from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import initStatusState from "../../store/initStatusState.store";
import Loading from "../../components/Loading/Loading.component";

export default function BaseLayout() {
  const re = redirect();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);

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

  return <>{isLoading ? <Loading /> : <Outlet />}</>;
}
