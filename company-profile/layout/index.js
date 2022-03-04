import React from "react";
import Header from "./Header/Header";
import HeaderStyleTwo from "./Header/HeaderStyleTwo";
import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();

  return (
    <div>
      {router.pathname === "/" ? <Header /> : <HeaderStyleTwo />}

      {props.children}
    </div>
  );
};

export default Index;
