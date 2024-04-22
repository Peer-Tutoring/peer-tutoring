import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return <>{isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />}</>;
};

export default ProtectedRoute;
