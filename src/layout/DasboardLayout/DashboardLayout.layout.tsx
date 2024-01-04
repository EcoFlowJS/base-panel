import { useEffect } from "react";

export default function DashboardLayout() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      sdf
    </div>
  );
}
