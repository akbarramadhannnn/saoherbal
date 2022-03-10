import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import Pertanyaans from "../components/Pertanyaan";
import Meta from "../components/Meta";

const Pertanyaan = () => {
  return (
    <React.Fragment>
    <Meta title="Pertanyaan | SAO Herbal" description="ini halaman Pertanyaan"/>
      <Breadcrumb pageTitle="Pertanyaan" />
      <Pertanyaans />
    </React.Fragment>
  );
};

export default Pertanyaan;
