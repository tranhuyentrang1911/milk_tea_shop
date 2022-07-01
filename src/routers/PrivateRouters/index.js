import { Navigate } from "react-router-dom";

import OrderPage from "pages/OrderPage";

const PrivateRoutes = () => {
  return localStorage.getItem("user") ? <OrderPage /> : <Navigate to="/" />;
};

export default PrivateRoutes;
