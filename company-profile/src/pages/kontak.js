import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ContacstMain from "../components/Contact/ContactsMain";
import Meta from "../components/Meta";

const Kontak = () => {
  return (
    <React.Fragment>
    <Meta title="Kontak | SAO Herbal" description="ini halaman kontak"/>
    <Breadcrumb pageTitle="Kontak" />
      <ContacstMain />
    </React.Fragment>
  );
};

export default Kontak;
