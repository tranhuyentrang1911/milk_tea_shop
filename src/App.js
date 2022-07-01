import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import HomePage from "pages/HomePage";
import PrivateRoutes from "routers/PrivateRouters";

import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/order/*" element={<PrivateRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
