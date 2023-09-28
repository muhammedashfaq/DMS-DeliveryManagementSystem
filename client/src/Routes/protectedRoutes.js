import React from "react";
import { Navigate } from "react-router-dom";
import { RouteObjects } from "./RouteObject";

export const ProtectedRoutesUser = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
};
export const ProtectedRoutesAdmin = (props) => {
  if (localStorage.getItem("admintoken")) {
    return props.children;
  } else {
    return <Navigate to={RouteObjects.AdminLogin} />;
  }
};
export const ProtectedRoutesdriver = (props) => {
  if (localStorage.getItem("drivertoken")) {
    return props.children;
  } else {
    return <Navigate to={RouteObjects.HubLogin} />;
  }
};
