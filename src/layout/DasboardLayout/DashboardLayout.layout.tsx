import { useLayoutEffect } from "react";
import Dashboard from "../../pages/Dashboard/Dashboard.page";

export default function DashboardLayout() {
  useLayoutEffect(() => {
    document.title = "Dashboard";
    window.history.replaceState(null, document.title, window.location.href);
  }, []);
  return <Dashboard />;
}
