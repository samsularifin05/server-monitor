import { getItem } from "../utils/localStroage";
import { IResponseLoginDto } from "../types/userdata";
import { Navigate } from "react-router-dom";
import React from "react";

// HOC: Redirect to dashboard if already logged in
export function withGuest<P>(Component: React.ComponentType<P>) {
  return function GuestOnlyComponent(props: React.PropsWithChildren<P>) {
    const userdata = getItem<IResponseLoginDto>("userdata");
    if (userdata.access_token) {
      return <Navigate to="/admin" replace />;
    }
    return <Component {...props} />;
  };
}
