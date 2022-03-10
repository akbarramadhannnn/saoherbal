import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import ShapeF from "../../../public/static/assets/img/shape/f.png";

const Footer = () => {
  return (
    <footer>
      <div
        className="footer-area pt-200"
        style={{ backgroundImage: `url(${"static/assets/img/bg/bg6.jpg"})` }}
      >
        <div className="container">
          <div className="footer-bg pb-50">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="footer-wrapper mb-30">
                  <div className="footer-logo">
                    <h5 className="text-white">
                      {/* <Image
                        src={require("../../public/assets/img/logo/white.png")}
                        alt=""
                      /> */}
                      SAO Herbal
                    </h5>
                  </div>
                  <div className="footer-text">
                    <p>
                      Lorem ipsum dolor amet cons adipisicing elit sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam quis nostrud exercitation
                      ullamco laboris nisi ut aliquip.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="footer-wrapper pl-45 mb-30">
                  <div className="footer-title">
                    <h4>Kontak</h4>
                    <Image src={ShapeF} alt="shape" />
                  </div>
                  <ul className="fotter-link">
                    <li>
                      <i>
                        <FontAwesomeIcon icon={["far", "paper-plane"]} />
                      </i>
                      <span>Yogyakarta, Bantul DIY Indonesia</span>
                    </li>
                    <li>
                      <i>
                        <FontAwesomeIcon icon={["far", "envelope-open"]} />
                      </i>
                      <span>sao@herbal.com</span>
                    </li>
                    <li>
                      <i>
                        <FontAwesomeIcon icon={["fas", "headphones"]} />
                      </i>
                      <span>+62 822-2233-4432</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-area">
            <div className="row">
              <div className="col-xl-12">
                <div className="copyright text-center">
                  <p>
                    Copyright <FontAwesomeIcon icon={["far", "copyright"]} />
                    2022 PT Serat Alam Organik Herbal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
