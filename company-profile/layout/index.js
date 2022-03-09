import React from "react";
import Head from "next/head";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import HeaderStyleTwo from "./Header/HeaderStyleTwo";
import { useRouter } from "next/router";
import FooterStyleTwo from "./Footer/FooterStyleTwo";

const Index = (props) => {
  const router = useRouter();

  return (
    <div>      
      {router.pathname === "/" ? <Header /> : <HeaderStyleTwo />}
      {props.children}
      <Footer />
    </div>
  );
};

export default Index;
