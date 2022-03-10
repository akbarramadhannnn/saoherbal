import React, { Component } from "react";

class H1ChooseUsSection extends Component {
  render() {
    return (
      <div className="choose-us-area pt-100 pb-70 pos-relative">
        <div className="shape spahe2 bounce-animate">
          <img
            src={require("../../../public/static/assets/img/shape/why-shape.png")}
            alt="gambar"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-12">
              <div className="choose-img mb-30">
                <img
                  src={require("../../../public/static/assets/img/Choose/01.jpg")}
                  alt="picture"
                />
              </div>
            </div>
            <div className="col-xl-5 col-lg-12">
              <div className="choose-wrapper mb-30">
                <div className="choose-section">
                  <h1>Kenapa harus memilih kami</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing eliseei
                    ustempor incididunt ut labore et dolore magna aliqua. Ut
                    enim minim veniam quis nostrud exercitation.
                  </p>
                </div>
                <div className="choose-content mb-40">
                  <div className="choose-us-img">
                    <img src={require('../../../public/static/assets/img/icon/1.png')} alt="picture" />
                  </div>
                  <div className="choose-text">
                    <h4>Proses yang mudah</h4>
                    <p>
                      Sorem ipsum dolor sit amet consecta dipisicing elit sed do
                      eiusmod tempor incidide.
                    </p>
                  </div>
                </div>
                <div className="choose-content mb-40">
                  <div className="choose-us-img">
                    <img src={require('../../../public/static/assets/img/icon/2.png')} alt="picture" />
                  </div>
                  <div className="choose-text">
                    <h4>100% Terpercaya</h4>
                    <p>
                      Sorem ipsum dolor sit amet consecta dipisicing elit sed do
                      eiusmod tempor incidide.
                    </p>
                  </div>
                </div>
                <div className="choose-content">
                  <div className="choose-us-img">
                    <img src={require('../../../public/static/assets/img/icon/3.png')} alt="picture" />
                  </div>
                  <div className="choose-text">
                    <h4>Produk Terbaik</h4>
                    <p>
                      Sorem ipsum dolor sit amet consecta dipisicing elit sed do
                      eiusmod tempor incidide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default H1ChooseUsSection;
