import { useEffect } from "react";
import Dashboard from "../../pages/Dashboard/Dashboard.page";

export default function DashboardLayout() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return <Dashboard />;
}
