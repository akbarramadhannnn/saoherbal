import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ProductSection from "../components/Product/ProductSection";
import Meta from "../components/Meta";

const Katalog = () => {
  return (
    <React.Fragment>
      <Meta title="Katalog | SAO Herbal" description="ini halaman katalog"/>
      <Breadcrumb pageTitle="Katalog" />
      <ProductSection />
    </React.Fragment>
  );
};

export default Katalog;
