import React from "react";
import AboutMain from '../components/About/AboutMain';
import Breadcrumb from "../components/Breadcrumb";
import Meta from "../components/Meta";

const Tentang = () => {
  return (
    <React.Fragment>
      <Meta title="Tentang | SAO Herbal" description="ini halaman tentang"/>
        <Breadcrumb pageTitle="Tentang Kami" />
        <AboutMain />
    </React.Fragment>
  );
};

export default Tentang;
