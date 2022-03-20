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
                      PT Serat Alam Organik Herbal
                    </h5>
                  </div>
                  <div className="footer-text">
                    <p>
                      <b>PT Serat Alam Organik herbal</b> (SAO Herbal) merupakan
                      sebuah produsen yang mengelola produk herbal di bidang
                      peternakan dan pertanian yang di kelola dengan sistem
                      serat berlapis dari berbagai macam unsur serat alam herbal
                      yang menyatu sehingga menghasilkan sebuah produk yang
                      berkualitas.
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
                        <FontAwesomeIcon icon={["fas", "location-dot"]} />
                      </i>
                      <span>Jln. Imogiri Siluk Jayan RT 01 Kebun Agung, Bantul, Daerah Istimewa Yogyakarta, 55782</span>
                    </li>
                    {/* <li>
                      <i>
                        <FontAwesomeIcon icon={["far", "envelope-open"]} />
                      </i>
                      <span>sao@herbal.com</span>
                    </li> */}
                    <li>
                      <i>
                        <FontAwesomeIcon icon={["fas", "phone"]} />
                      </i>
                      <span>0813-9221-4848</span>
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
