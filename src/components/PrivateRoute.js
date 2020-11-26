import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ component: Component, ...all }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...all}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
export default PrivateRoute;
