import React, { Component } from "react";
import ProductSection from "../Product/ProductSection";
import SliderDefault from "./../Slider/SliderDefault";
import H1FeaturesSection from "./H1FeaturesSection";
import H1ChooseUsSection from "./H1ChooseUsSection";

class HomeMain extends Component {
  render() {
    return (
      <React.Fragment>
        <SliderDefault />
        <H1FeaturesSection />
        <ProductSection />
        <H1ChooseUsSection />
      </React.Fragment>
    );
  }
}

export default HomeMain;
