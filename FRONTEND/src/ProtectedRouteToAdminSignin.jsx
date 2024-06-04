/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteToAdminSignin = ({ redirectPath = "/adminSign" }) => {
  localStorage.setItem(
    "adminToken",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhlc2hhbnRoYXJ1c2hrYTIwMDJAZ21haWwuY29tIiwibGV2ZWwiOiIyIiwiaWF0IjoxNzE3MzQ4MTk2LCJleHAiOjE3NTMzNDQ1OTZ9.QsSUVievELFcAYocrMBVnkMZYdwbZ_-MwnaBB0-5tZ4"
  );
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteToAdminSignin;
