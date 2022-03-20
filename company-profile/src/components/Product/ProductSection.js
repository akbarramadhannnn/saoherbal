import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import shape1 from "../../../public/static/assets/img/shape/shape1.png";
import shape2 from "../../../public/static/assets/img/shape/shape2.png";
import shape3 from "../../../public/static/assets/img/shape/shape3.png";
import shape4 from "../../../public/static/assets/img/shape/shape4.png";
import shapeimage1 from "../../../public/static/assets/img/shape/1.png";
import product1 from "../../../public/static/assets/img/product/product1.jpg";
import product2 from "../../../public/static/assets/img/product/product2.jpg";
import product3 from "../../../public/static/assets/img/product/product3.jpg";
import product4 from "../../../public/static/assets/img/product/product4.jpg";
import Image from "next/image";

class ProductSection extends Component {
  render() {
    return (
      <div className="product-area pos-relative pt-110 pb-85 fix">
        <div className="shape spahe1 bounce-animate">
          <img src={shape1} alt="shape1" />
        </div>
        <div className="shape spahe2 bounce-animate">
          <img src={shape2} alt="shape2" />
        </div>
        <div className="shape spahe3 bounce-animate">
          <img src={shape3} alt="shape3" />
        </div>
        <div className="shape spahe4 bounce-animate">
          <img src={shape4} alt="shape4" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 offset-lg-3 offset-xl-3">
              <div className="section-title text-center section-circle mb-70">
                <div className="section-img">
                  <img src={shapeimage1} alt="shapeimage1" />
                </div>
                <h1>Produk Kami</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmotempor incididunt ut labore et dolore magna aliqua enim
                  minim veniam
                </p>
              </div>
            </div>
          </div>
          <Tabs className="row" selectedTabClassName="active">
            <div className="col-xl-12">
              <TabList className="nav product-tab justify-content-center mb-75">
                <Tab className="nav-item">
                  <div className="product-tab-content text-center">
                    <div className="product-tab-img">
                      {/* <i className="falticon-"></i> */}
                    </div>
                    <h4>Pertanian</h4>
                  </div>
                </Tab>
                <Tab className="nav-item">
                  <div className="product-tab-content text-center">
                    <div className="product-tab-img">
                      {/* <i className="flaticon-pumpkin"></i> */}
                    </div>
                    <h4> Peternakan</h4>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product1} alt="product" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Broccoli Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product2} alt="image2" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Avocado Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$29.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product3} alt="image3" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Breadfruit Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$25.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product4} alt="image4" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Blackberries Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product1} alt="product1" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Broccoli Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product3} alt="image3" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Breadfruit Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$25.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product4} alt="image4" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Blackberries Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$49.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6">
                    <div className="product-wrapper text-center mb-30">
                      <div className="product-img">
                        <Link href="/shop-details" as="/shop-details">
                          <a>
                            <img src={product2} alt="image2" />
                          </a>
                        </Link>
                      </div>
                      <div className="product-text">
                        <h4>
                          <Link href="/shop-details" as="/shop-details">
                            <a>Avocado Head</a>
                          </Link>
                        </h4>

                        <div className="pro-price">
                          <span>$29.99</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ProductSection;
