/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteToSignin = ({ redirectPath = "/home" }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteToSignin;
