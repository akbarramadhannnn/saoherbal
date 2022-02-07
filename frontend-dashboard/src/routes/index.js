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

//KONSUMEN
//distributor
import Distributor from "../pages/Konsumen/Distributor";
import CreateDistributor from "../pages/Konsumen/Distributor/create";
import UpdateDistributor from "../pages/Konsumen/Distributor/update";

//toko
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

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //profile
  { path: "/profile", component: UserProfile },

  //category
  { path: "/master/category", exact: true, component: Category },
  { path: "/master/category/create", component: CreateCategory },
  { path: "/master/category/update/:id", component: UpdateCategory },

  //variant
  { path: "/master/variant", exact: true, component: Variant },
  { path: "/master/variant/create", component: CreateVariant },
  { path: "/master/variant/update/:id", component: UpdateVariant },

  //product
  { path: "/master/product", exact: true, component: Product },
  { path: "/master/product/create", component: CreateProduct },
  { path: "/master/product/update/:id", component: UpdateProduct },

  //konsumen
  //distributor
  { path: "/konsumen/distributor", exact: true, component: Distributor },
  { path: "/konsumen/distributor/create", component: CreateDistributor },
  { path: "/konsumen/distributor/update/:id", component: UpdateDistributor },

  //toko
  { path: "/konsumen/toko", exact: true, component: Toko },
  { path: "/konsumen/toko/create", component: CreateToko },
  { path: "/konsumen/toko/update/:id", component: UpdateToko },

  //transaction
  { path: "/transaction", exact: true, component: Transaksi },
  { path: "/transaction/create", component: CreateTransaksi },
  { path: "/transaction/detail/:code", component: DetailTransaksi },

  // tagihan
  { path: "/tagihan", exact: true, component: Tagihan },
  { path: "/tagihan/detail/:billNumber", component: DetailTagihan },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [{ path: "/login", component: Login }];

export { authProtectedRoutes, publicRoutes };
