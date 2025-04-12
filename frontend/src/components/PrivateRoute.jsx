import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Center, Spinner } from "@chakra-ui/react";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    // Redirigir a la página de login, pero guardar la ubicación actual
    // para poder volver después de iniciar sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
