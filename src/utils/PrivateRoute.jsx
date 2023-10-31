import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useSelector((state) => state.auth.value);

  return (
    <Route
      {...rest}
      element={isLoggedIn ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
