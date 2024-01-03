import { Outlet } from "react-router-dom";
import initService from "../service/init/init.service";
import redirect from "../utils/redirect/redirect";
import { useEffect } from "react";

export default function BaseLayout() {
  const ststus = initService();
  const re = redirect();

  useEffect(() => {
    if (ststus.isNew && !ststus.isLoggedIn) re("setup");
    if (!ststus.isNew && !ststus.isLoggedIn) re("login");
    if (!ststus.isNew && ststus.isLoggedIn) re("dashboard");
  }, []);

  return <Outlet />;
}
