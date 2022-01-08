import React from "react";
import { Redirect } from "react-router-dom";
// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//MASTER
import Category from "../pages/Master/category";
import CreateCategory from "../pages/Master/category/create";
import UpdateCategory from "../pages/Master/category/update";

//Variant
import Variant from "../pages/Master/variant";
import CreateVariant from "../pages/Master/variant/create";
import UpdateVariant from "../pages/Master/variant/update";

//product
import Product from "../pages/Master/product";
import CreateProduct from "../pages/Master/product/create";
import UpdateProduct from "../pages/Master/product/update";

//Konsumen
import Distributor from "../pages/Konsumen/Distributor";
import Toko from "../pages/Konsumen/Toko";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  //category
  { path: "/master/category", exact: true, component: Category },
  { path: "/master/category/create", component: CreateCategory },
  { path: "/master/category/update", component: UpdateCategory },

  //variant
  { path: "/master/variant", exact: true, component: Variant },
  { path: "/master/variant/create", component: CreateVariant },
  { path: "/master/variant/update", component: UpdateVariant },

  //product
  { path: "/master/product", exact: true, component: Product },
  { path: "/master/product/create", component: CreateProduct },
  { path: "/master/product/update", component: UpdateProduct },

  { path: "/distributor", component: Distributor },
  { path: "/toko", component: Toko },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
