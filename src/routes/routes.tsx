import { Error404 } from "@eco-flow/components-lib";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../components/Loading/Loading.component";
const BaseLayout = lazy(() => import("../layout/BaseLayout/BaseLayout.layout"));
const SetupLayout = lazy(
  () => import("../layout/SetupLayout/SetupLayout.layout")
);
const LoginLayout = lazy(
  () => import("../layout/LoginLayout/LoginLayout.layout")
);
const DashboardLayout = lazy(
  () => import("../layout/DasboardLayout/DashboardLayout.layout")
);

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <Suspense fallback={<Loading />}>
                <BaseLayout />
              </Suspense>
            }
          >
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
