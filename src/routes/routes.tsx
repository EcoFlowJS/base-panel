import { Error404 } from "@eco-flow/components-lib";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layout/DasboardLayout/DashboardLayout.layout";
import SetupLayout from "../layout/SetupLayout/SetupLayout.layout";
import LoginLayout from "../layout/LoginLayout/LoginLayout.layout";
const BaseLayout = lazy(() => import("../layout/BaseLayout/BaseLayout.layout"));

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<BaseLayout />}>
            <Route path="setup" element={<SetupLayout />} />
            <Route path="login" element={<LoginLayout />} />
            <Route path="dashboard" element={<DashboardLayout />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
