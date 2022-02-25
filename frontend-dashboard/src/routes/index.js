import React from "react";
import { Redirect } from "react-router-dom";
// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//MASTER
// Category
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

//product
import Employee from "../pages/Master/employee";
import CreateEmployee from "../pages/Master/employee/create";
import UpdateEmployee from "../pages/Master/employee/update";

//KONSUMEN
//Distributor
import Distributor from "../pages/Konsumen/Distributor";
import CreateDistributor from "../pages/Konsumen/Distributor/create";
import UpdateDistributor from "../pages/Konsumen/Distributor/update";

//Toko
import Toko from "../pages/Konsumen/Toko";
import CreateToko from "../pages/Konsumen/Toko/create";
import UpdateToko from "../pages/Konsumen/Toko/update";

//transaksi
import Transaksi from "../pages/Transaksi";
import CreateTransaksi from "../pages/Transaksi/Create";
import DetailTransaksi from "../pages/Transaksi/Detail";

//tagihan
import Tagihan from "../pages/Tagihan";
import DetailTagihan from "../pages/Tagihan/detail";

//konfigurasi
import Konfigurasi from "../pages/Konfigurasi";

const authProtectedRoutes = selectorAuth => {
  let result = [];
  if (selectorAuth.isAuth) {
    const position = selectorAuth.user.position;
    if (position === "0") {
      result = [
        { path: "/admin/dashboard", component: Dashboard },

        //profile
        { path: "/admin/profile", component: UserProfile },

        //category
        { path: "/admin/master/category", exact: true, component: Category },
        { path: "/admin/master/category/create", component: CreateCategory },
        {
          path: "/admin/master/category/update/:id",
          component: UpdateCategory,
        },

        //variant
        { path: "/admin/master/variant", exact: true, component: Variant },
        { path: "/admin/master/variant/create", component: CreateVariant },
        { path: "/admin/master/variant/update/:id", component: UpdateVariant },

        //product
        { path: "/admin/master/product", exact: true, component: Product },
        { path: "/admin/master/product/create", component: CreateProduct },
        { path: "/admin/master/product/update/:id", component: UpdateProduct },

        //product
        { path: "/admin/master/employee", exact: true, component: Employee },
        { path: "/admin/master/employee/create", component: CreateEmployee },
        {
          path: "/admin/master/employee/update/:id",
          component: UpdateEmployee,
        },

        //konsumen
        //distributor
        {
          path: "/admin/konsumen/distributor",
          exact: true,
          component: Distributor,
        },
        {
          path: "/admin/konsumen/distributor/create",
          component: CreateDistributor,
        },
        {
          path: "/admin/konsumen/distributor/update/:id",
          component: UpdateDistributor,
        },

        //toko
        { path: "/admin/konsumen/toko", exact: true, component: Toko },
        { path: "/admin/konsumen/toko/create", component: CreateToko },
        { path: "/admin/konsumen/toko/update/:id", component: UpdateToko },

        //transaction
        { path: "/admin/transaction", exact: true, component: Transaksi },
        { path: "/admin/transaction/create", component: CreateTransaksi },
        { path: "/admin/transaction/detail/:code", component: DetailTransaksi },

        // tagihan
        { path: "/admin/tagihan", exact: true, component: Tagihan },
        { path: "/admin/tagihan/detail/:billNumber", component: DetailTagihan },

        // tagihan
        { path: "/admin/configure", exact: true, component: Konfigurasi },
        // this route should be at the end of all other routes
        // eslint-disable-next-line react/display-name
        {
          path: "/",
          exact: true,
          component: () => <Redirect to="/admin/dashboard" />,
        },
        {
          path: "*",
          exact: true,
          component: () => <Redirect to="/admin/dashboard" />,
        },
      ];
    } else if (position === "2") {
      result = [
        { path: "/sales/dashboard", component: Dashboard },
        //transaction
        { path: "/sales/transaction", exact: true, component: Transaksi },
        { path: "/sales/transaction/create", component: CreateTransaksi },
        { path: "/sales/transaction/detail/:code", component: DetailTransaksi },
        {
          path: "/",
          exact: true,
          component: () => <Redirect to="/sales/dashboard" />,
        },
        {
          path: "*",
          exact: true,
          component: () => <Redirect to="/sales/dashboard" />,
        },
      ];
    }
  } else {
    result = [
      { path: "/", exact: true, component: () => <Redirect to="/login" /> },
    ];
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
