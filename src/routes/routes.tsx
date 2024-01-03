import { Error404 } from "@eco-flow/components-lib";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const BaseLayout = lazy(() => import("../layout/BaseLayout.layout"));

export default () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<BaseLayout />}>
            <Route path="setup" element="setup" />
            <Route path="login" element="login" />
            <Route path="dashboard" element="dashboard" />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
