import React, { Component } from "react";
import Feature3 from "../../../public/static/assets/img/about/2.jpg";

class ApAbout4Section extends Component {
  render() {
    return (
      <div className="about-us-area about-shape pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="about-img mb-30">
                <img src={Feature3} alt="imgs" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="about-info mb-30">
                <h1>
                  Selamat Datang di
                  <br /> SAO Herbal
                </h1>
                {/* <span>with love & dedication</span> */}
                <p>
                  <b>PT Serat Alam Organik herbal</b> (SAO Herbal) merupakan
                  sebuah produsen yang mengelola produk herbal di bidang
                  peternakan dan pertanian yang di kelola dengan sistem serat
                  berlapis dari berbagai macam unsur serat alam herbal yang
                  menyatu sehingga menghasilkan sebuah produk yang berkualitas.
                </p>
              </div>

              <div className="about-info mb-30">
                <h1>Tujuan</h1>
                {/* <span>with love & dedication</span> */}
                <p>
                  Membantu para petani untuk menghasilkan panen yang
                  berkualiatas, sehat alami dari alam kembali ke alam, dan
                  meningkatkan kesejahteraan yang maksimal.
                </p>
              </div>

              <div className="about-info mb-30">
                <h1>Visi</h1>
                {/* <span>with love & dedication</span> */}
                <p>
                  Menjadikan petani sejahtera, makmur, dan hasil panen
                  berkualitas sehat alami dari alam kembali ke alam.
                </p>
              </div>

              <div className="about-info mb-30">
                <h1>Misi</h1>
                {/* <span>with love & dedication</span> */}
                <p>
                  menciptakan produk herbal yang dapat di nikmati petani dengan
                  harga terjangkau, ramah lingkungan, hasil berlimpah, dan
                  berkualitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApAbout4Section;
