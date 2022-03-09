import React, { Component } from "react";
import Image from "next/image";
import shapeC from "../../public/assets/img/shape/c.png";

class CPContactInfoSection extends Component {
  render() {
    return (
      <div className="contact-address-area pt-120 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-6 ">
              <div className="contact-address-wrapper mb-30">
                <div className="row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    <div className="contact-address-title">
                      <h3>YOGYAKARTA</h3>
                      <div className="contact-address-img">
                        <Image src={shapeC} alt="image" />
                      </div>
                    </div>
                    <ul className="contact-link">
                      <li>
                        205 Bernie Greens Apt. 210, <br /> Bantul, Yogyakarta,
                        Indonesia
                      </li>
                      <li>sao@herbal.com</li>
                      <li>+62-822-7766-3423</li>
                    </ul>
                  </div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CPContactInfoSection;
