import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useRedirectContext } from "./context/RedirectContext";

const ProtectedRoute = ({ children }) => {
  const { redirecting } = useRedirectContext();
  return !redirecting ? children : <Navigate to="/form" />;
};

export default ProtectedRoute;
