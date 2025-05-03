import { Navigate, Outlet } from "react-router-dom";
import { getGlobalItem } from "../utils/utils";

const PrivateRoute = () => {
  return getGlobalItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
