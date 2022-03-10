import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SliderDefault = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(!isOpen);

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button type="button" onClick={onClick} className={className}>
        <i>
          <FontAwesomeIcon icon={["fas", "chevron-right"]} />
        </i>
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
      <button type="button" onClick={onClick} className={className}>
        {" "}
        <i>
          <FontAwesomeIcon icon={["fas", "chevron-left"]} />
        </i>
      </button>
    );
  }

  return (
    <div className="slider-area">
      <div className="single-slider">
        <div
          className="slider-height  d-flex align-items-center"
          // style={{ ...sliderImg }}
          style={{
            backgroundImage: `url(${"static/assets/img/bg/bg9.jpg"})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container">
            <div className="row ">
              <div className="col-xl-12">
                <div className="slider-content mt-85 ">
                  <h1
                    data-animation="fadeInUp"
                    data-delay=".6s"
                    className="text-white"
                  >
                    SAO Herbal Is <br /> Good For Plants
                  </h1>
                  <p
                    data-animation="fadeInUp"
                    data-delay=".8s"
                    className="text-white"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiu smod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco.
                  </p>
                  <div className="slider-button">
                    <Link href="/tentang" as="/tentang">
                      <a
                        data-animation="fadeInLeft"
                        data-delay=".8s"
                        className="btn"
                      >
                        Lihat Katalog
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderDefault;
