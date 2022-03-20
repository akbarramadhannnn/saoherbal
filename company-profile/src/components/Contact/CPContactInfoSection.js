import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shapeC from "../../../public/static/assets/img/shape/c.png";

class CPContactInfoSection extends Component {
  render() {
    return (
      <div className="contact-address-area pt-120 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-6 col-md-6 ">
              <div className="contact-address-wrapper mb-30">
                <div className="row">
                  {/* <div className="col-md-3"></div> */}
                  <div className="col-md-12">
                    <div className="contact-address-title text-center">
                      <h1>Yogyakarta</h1>
                      <div className="contact-address-img">
                        <img src={shapeC} alt="image" />
                      </div>
                    </div>
                    <ul className="contact-link">
                      <li>
                        <i>
                          <FontAwesomeIcon icon={["fas", "location-dot"]} />
                        </i>{" "}
                        <span>
                          Jln. Imogiri Siluk Jayan RT 01 Kebun Agung, Bantul,
                          Daerah Istimewa Yogyakarta, 55782
                        </span>
                      </li>
                      <li>
                        <i>
                          <FontAwesomeIcon icon={["fas", "phone"]} />
                        </i>{" "}
                        <span>0813-9221-4848</span>
                      </li>
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
