import { Error404 } from "@eco-flow/components-lib";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "../layout/BaseLayout.layout";

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
