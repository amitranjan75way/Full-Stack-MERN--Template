import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath = "/login",
}) => {
  const authData = useAppSelector(store => store.auth);
  return authData.isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;