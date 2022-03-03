import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

// List Route
import {
  RouteListDashboard,
  RouteListProfile,
  RouteListCategory,
  RouteListVariant,
  RouteListProduct,
  RouteListEmployee,
  RouteListDistributor,
  RouteListToko,
  RouteListTransaction,
  RouteListBill,
  RouteListConfigure,
  RouteListRedirectDashboard,
  RouteListRedirectLogin,
} from "./list";

const authProtectedRoutes = selectorAuth => {
  let result = [];
  if (selectorAuth.isAuth) {
    const position = selectorAuth.user.position;
    if (position === "0") {
      result = [
        ...RouteListDashboard(position),
        ...RouteListProfile(position),
        ...RouteListCategory(position),
        ...RouteListVariant(position),
        ...RouteListProduct(position),
        ...RouteListEmployee(position),
        ...RouteListDistributor(position),
        ...RouteListToko(position),
        ...RouteListTransaction(position),
        ...RouteListBill(position),
        ...RouteListRedirectDashboard(position),
      ];
    } else if (position === "9") {
      result = [
        ...RouteListDashboard(position),
        ...RouteListProfile(position),
        ...RouteListCategory(position),
        ...RouteListVariant(position),
        ...RouteListProduct(position),
        ...RouteListEmployee(position),
        ...RouteListDistributor(position),
        ...RouteListToko(position),
        ...RouteListTransaction(position),
        ...RouteListBill(position),
        ...RouteListConfigure(position),
        ...RouteListRedirectDashboard(position),
      ];
    } else if (position === "2") {
      result = [
        ...RouteListDashboard(position),
        ...RouteListDistributor(position),
        ...RouteListToko(position),
        ...RouteListTransaction(position),
        ...RouteListRedirectDashboard(position),
      ];
    }
  } else {
    result = [...RouteListRedirectLogin];
  }

  return result;
};

const publicRoutes = selectorAuth => {
  let result = [{ path: "/login", component: Login }];
  if (selectorAuth.isAuth === false) {
    result.push({
      path: "/",
      exact: true,
      component: () => <Redirect to="/login" />,
    });
  }
  return result;
};

export { authProtectedRoutes, publicRoutes };
