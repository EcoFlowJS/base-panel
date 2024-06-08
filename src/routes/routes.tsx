import { Error404 } from "@ecoflow/components-lib";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginLayout from "../layout/LoginLayout/LoginLayout.layout";
import SetupLayout from "../layout/SetupLayout/SetupLayout.layout";
import BaseLayout from "../layout/BaseLayout/BaseLayout.layout";
import DashboardLayout from "../layout/DasboardLayout/DashboardLayout.layout";

export default () => {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/auth" element={<BaseLayout />}>
          <Route path="setup" element={<SetupLayout />} />
          <Route path="login" element={<LoginLayout />} />
          <Route path="dashboard" element={<DashboardLayout />} />
        </Route>
        <Route
          path="*"
          element={
            <Error404 showBackButton onClick={() => navigate("/auth")} />
          }
        />
      </Routes>
    </>
  );
};
