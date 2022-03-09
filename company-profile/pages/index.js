import React from "react";
import HomeMain from "../components/Home/HomeMain";
import Meta from "../components/Meta";

export default function Home() {
  return (
    <React.Fragment>      
      <Meta title="Home | SAO Herbal" description="ini halaman home"/>
      <HomeMain />
    </React.Fragment>
  );
}
