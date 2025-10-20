import { getItem } from "../utils/localStroage";
import { IResponseLoginDto } from "../types/userdata";
import { Navigate } from "react-router-dom";
import React from "react";

// Higher-Order Component (HOC) for login check
export function withAuth<P>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: React.PropsWithChildren<P>) {
    const userdata = getItem<IResponseLoginDto>("userdata");
    if (!userdata.access_token) {
      return <Navigate to="/" replace />;
    }
    return <Component {...props} />;
  };
}
