import React, { Component } from "react";
import ProductSection from "../Product/ProductSection";
import SliderDefault from "./../Slider/SliderDefault";
import H1FeaturesSection from "./H1FeaturesSection";
import H1ChooseUsSection from "./H1ChooseUsSection";

class HomeMain extends Component {
  render() {
    return (
      <React.Fragment>
        {/* slider-start */}
        <SliderDefault />
        {/* <SliderStyleThree /> */}
       
        {/* features-area-start */}
        <H1FeaturesSection />
        {/* features-area-end */}

        {/* product-area-start */}
        <ProductSection />
        {/* product-area-end */}
        
        {/* choose-us-area-start */}
        <H1ChooseUsSection />
        {/* choose-us-area-end */}

      </React.Fragment>
    );
  }
}

export default HomeMain;
