import React from "react";
import { Redirect } from "react-router-dom";
// User profile
import UserProfile from "../pages/Authentication/UserProfile";

// Dashboard
import DashboardAdmin from "../pages/Dashboard/DashboardAdmin";
import DashboardSales from "../pages/Dashboard/DashboardSales";

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

import { GeneratePrefixUrl } from "../utils/generate";

export const RouteListDashboardAdmin = position => {
  return [
    {
      path: `${GeneratePrefixUrl(position)}/dashboard`,
      component: DashboardAdmin,
    },
  ];
};

export const RouteListDashboardSales = position => {
  return [
    {
      path: `${GeneratePrefixUrl(position)}/dashboard`,
      component: DashboardSales,
    },
  ];
};

export const RouteListProfile = position => {
  return [
    { path: `${GeneratePrefixUrl(position)}/profile`, component: UserProfile },
  ];
};

export const RouteListCategory = position => {
  return [
    {
      path: `${GeneratePrefixUrl(position)}/master/category`,
      exact: true,
      component: Category,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/category/create`,
      component: CreateCategory,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/category/update/:id`,
      component: UpdateCategory,
    },
  ];
};

export const RouteListVariant = position => {
  //variant
  return [
    {
      path: `${GeneratePrefixUrl(position)}/master/variant`,
      exact: true,
      component: Variant,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/variant/create`,
      component: CreateVariant,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/variant/update/:id`,
      component: UpdateVariant,
    },
  ];
};

export const RouteListProduct = position => {
  //product
  return [
    {
      path: `${GeneratePrefixUrl(position)}/master/product`,
      exact: true,
      component: Product,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/product/create`,
      component: CreateProduct,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/product/update/:id`,
      component: UpdateProduct,
    },
  ];
};

export const RouteListEmployee = position => {
  //employee
  return [
    {
      path: `${GeneratePrefixUrl(position)}/master/employee`,
      exact: true,
      component: Employee,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/employee/create`,
      component: CreateEmployee,
    },
    {
      path: `${GeneratePrefixUrl(position)}/master/employee/update/:id`,
      component: UpdateEmployee,
    },
  ];
};

export const RouteListDistributor = position => {
  //distributor
  return [
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/distributor`,
      exact: true,
      component: Distributor,
    },
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/distributor/create`,
      component: CreateDistributor,
    },
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/distributor/update/:id`,
      component: UpdateDistributor,
    },
  ];
};

export const RouteListToko = position => {
  //toko
  return [
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/toko`,
      exact: true,
      component: Toko,
    },
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/toko/create`,
      component: CreateToko,
    },
    {
      path: `${GeneratePrefixUrl(position)}/konsumen/toko/update/:id`,
      component: UpdateToko,
    },
  ];
};

export const RouteListTransaction = position => {
  //transaction
  return [
    {
      path: `${GeneratePrefixUrl(position)}/transaction`,
      exact: true,
      component: Transaksi,
    },
    {
      path: `${GeneratePrefixUrl(position)}/transaction/create`,
      component: CreateTransaksi,
    },
    {
      path: `${GeneratePrefixUrl(position)}/transaction/detail/:code`,
      component: DetailTransaksi,
    },
  ];
};

export const RouteListBill = position => {
  //bill
  return [
    {
      path: `${GeneratePrefixUrl(position)}/tagihan`,
      exact: true,
      component: Tagihan,
    },
    {
      path: `${GeneratePrefixUrl(position)}/tagihan/detail/:billNumber`,
      component: DetailTagihan,
    },
  ];
};

export const RouteListConfigure = position => {
  //configure
  return [
    {
      path: `${GeneratePrefixUrl(position)}/configure`,
      exact: true,
      component: Konfigurasi,
    },
  ];
};

export const RouteListRedirectDashboard = position => {
  return [
    {
      path: "/",
      exact: true,
      component: () => (
        <Redirect to={`${GeneratePrefixUrl(position)}/dashboard`} />
      ),
    },
    {
      path: "*",
      exact: true,
      component: () => (
        <Redirect to={`${GeneratePrefixUrl(position)}/dashboard`} />
      ),
    },
  ];
};

export const RouteListRedirectLogin = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />,
  },
];
