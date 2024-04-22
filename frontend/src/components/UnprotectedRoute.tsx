import { Navigate, Outlet } from "react-router-dom";

const UnprotectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return <>{!isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

export default UnprotectedRoute;
