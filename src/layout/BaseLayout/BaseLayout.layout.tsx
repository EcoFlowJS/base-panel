import { Outlet } from "react-router-dom";
import initService from "../../service/init/init.service";
import redirect from "../../utils/redirect/redirect";
import { useEffect } from "react";
import { useAtom } from "jotai";
import initStatus from "../../store/initStatus.store";

export default function BaseLayout() {
  const status = initService();
  const re = redirect();
  const [_initStatus, setinitStatus] = useAtom(initStatus);

  useEffect(() => {
    setinitStatus({ ...status });
    if (status.isNew && !status.isLoggedIn) re("setup");
    if (!status.isNew && !status.isLoggedIn) re("login");
    if (!status.isNew && status.isLoggedIn) re("dashboard");
  }, []);

  return <Outlet />;
}
