import PropTypes from "prop-types";
import React, { Fragment, useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";

//Simple bar
// import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import { GeneratePrefixUrl } from "../../../utils/generate";

// List Menu
import {
  MenuDashboard,
  MenuMaster,
  MenuKonsumen,
  MenuBiaya,
  MenuTransaction,
  MenuConfigure,
} from "./ListMenu";

const SidebarContent = props => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const [contentMenu, setContentMenu] = useState([]);

  useEffect(() => {
    let arrMenu = [];
    if (position === "0") {
      arrMenu = [
        ...MenuDashboard(position),
        ...MenuMaster(position),
        ...MenuKonsumen(position),
        ...MenuBiaya(position),
        ...MenuTransaction(position),
      ];
    } else if (position === "2") {
      arrMenu = [
        ...MenuDashboard(position),
        ...MenuKonsumen(position),
        ...MenuTransaction(position),
      ];
    } else if (position === "9") {
      arrMenu = [
        ...MenuDashboard(position),
        ...MenuMaster(position),
        ...MenuKonsumen(position),
        ...MenuBiaya(position),
        ...MenuTransaction(position),
        ...MenuConfigure(position),
      ];
    }
    setContentMenu(arrMenu);
  }, [position]);

  useEffect(() => {
    if (contentMenu.length > 0) {
      var pathName = props.location.pathname;

      const initMenu = () => {
        var ul = document.getElementById("side-menu");
        new MetisMenu("#side-menu");
        var matchingMenuItem = null;
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
          if (pathName === items[i].pathname) {
            matchingMenuItem = items[i];
            break;
          }
        }
        if (matchingMenuItem) {
          activateParentDropdown(matchingMenuItem);
        }
      };
      initMenu();
    }
  }, [props.location.pathname, contentMenu]);

  const activateParentDropdown = useCallback(item => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  }, []);

  return (
    <Fragment>
      <div id="sidebar-menu">
        {contentMenu.length > 0 && (
          <ul className="metismenu list-unstyled" id="side-menu">
            {contentMenu.map((m, im) => (
              <Fragment key={im}>
                {!m.sub.length > 0 && (
                  <li>
                    <Link to={m.link}>
                      <i className={m.icon} />
                      <span>{m.name}</span>
                    </Link>
                  </li>
                )}

                {m.sub.length > 0 && (
                  <li>
                    <Link to="/#" className="has-arrow">
                      <i className={m.icon} />
                      <span>{m.name}</span>
                    </Link>
                    <ul className="sub-menu" aria-expanded="false">
                      {m.sub.map((s, is) => (
                        <li key={is}>
                          <Link to={s.link}>
                            <span>{s.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        )}
        {/* {(position === "0" || position === "9") && (
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to={`${GeneratePrefixUrl(position)}/dashboard`}>
                <i className="bx bx-home-circle" />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-data" />
                <span>{props.t("Master")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/master/category`}>
                    {props.t("Kategori")}
                  </Link>
                </li>
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/master/variant`}>
                    {props.t("Varian")}
                  </Link>
                </li>
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/master/product`}>
                    {props.t("Produk")}
                  </Link>
                </li>
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/master/employee`}>
                    {props.t("Karyawan")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store" />
                <span>{props.t("Konsumen")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link
                    to={`${GeneratePrefixUrl(position)}/konsumen/distributor`}
                  >
                    {props.t("Distributor")}
                  </Link>
                </li>
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/konsumen/toko`}>
                    {props.t("Toko")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to={`${GeneratePrefixUrl(position)}/transaction`}>
                <i className="bx bx-money" />
                <span>{props.t("Transaksi")}</span>
              </Link>
            </li>

            {position === "9" && (
              <li>
                <Link to={`${GeneratePrefixUrl(position)}/configure`}>
                  <i className="bx bx-cog" />
                  <span>{props.t("Konfigurasi")}</span>
                </Link>
              </li>
            )}
          </ul>
        )}

        {position === "2" && (
          <ul className="metismenu list-unstyled" id="side-menu">
            <li>
              <Link to={`${GeneratePrefixUrl(position)}/dashboard`}>
                <i className="bx bx-home-circle" />
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-store" />
                <span>{props.t("Konsumen")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link
                    to={`${GeneratePrefixUrl(position)}/konsumen/distributor`}
                  >
                    {props.t("Distributor")}
                  </Link>
                </li>
                <li>
                  <Link to={`${GeneratePrefixUrl(position)}/konsumen/toko`}>
                    {props.t("Toko")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to={`${GeneratePrefixUrl(position)}/transaction`}>
                <i className="bx bx-money" />
                <span>{props.t("Transaksi")}</span>
              </Link>
            </li>
          </ul>
        )} */}
      </div>
    </Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
};

export default withRouter(withTranslation()(SidebarContent));

// class SidebarContent extends Component {
//   constructor(props) {
//     super(props);
//     this.refDiv = React.createRef();
//   }

//   componentDidMount() {
//     this.initMenu();
//   }

//   componentDidUpdate(prevProps, prevState, ss) {
//     if (this.props.type !== prevProps.type) {
//       this.initMenu();
//     }
//   }

//   initMenu() {
//     new MetisMenu("#side-menu");

//     let matchingMenuItem = null;
//     const ul = document.getElementById("side-menu");
//     const items = ul.getElementsByTagName("a");
//     for (let i = 0; i < items.length; ++i) {
//       if (this.props.location.pathname === items[i].pathname) {
//         matchingMenuItem = items[i];
//         break;
//       }
//     }
//     if (matchingMenuItem) {
//       this.activateParentDropdown(matchingMenuItem);
//     }
//   }

//   scrollElement = item => {
//     setTimeout(() => {
//       if (this.refDiv.current !== null) {
//         if (item) {
//           const currentPosition = item.offsetTop;
//           if (currentPosition > window.innerHeight) {
//             if (this.refDiv.current)
//               this.refDiv.current.getScrollElement().scrollTop =
//                 currentPosition - 300;
//           }
//         }
//       }
//     }, 300);
//   };

// activateParentDropdown = item => {
//   item.classList.add("active");
//   const parent = item.parentElement;

//   const parent2El = parent.childNodes[1];
//   if (parent2El && parent2El.id !== "side-menu") {
//     parent2El.classList.add("mm-show");
//   }

//   if (parent) {
//     parent.classList.add("mm-active");
//     const parent2 = parent.parentElement;

//     if (parent2) {
//       parent2.classList.add("mm-show"); // ul tag

//       const parent3 = parent2.parentElement; // li tag

//       if (parent3) {
//         parent3.classList.add("mm-active"); // li
//         parent3.childNodes[0].classList.add("mm-active"); //a
//         const parent4 = parent3.parentElement; // ul
//         if (parent4) {
//           parent4.classList.add("mm-show"); // ul
//           const parent5 = parent4.parentElement;
//           if (parent5) {
//             parent5.classList.add("mm-show"); // li
//             parent5.childNodes[0].classList.add("mm-active"); // a tag
//           }
//         }
//       }
//     }
//     this.scrollElement(item);
//     return false;
//   }
//   this.scrollElement(item);
//   return false;
// };

//   render() {
// return (
//   <React.Fragment>
//     <SimpleBar className="h-100" ref={this.refDiv}>
//       <div id="sidebar-menu">
//         <ul className="metismenu list-unstyled" id="side-menu">
//           <li>
//             <Link to="/admin/dashboard">
//               <i className="bx bx-home-circle" />
//               <span>{this.props.t("Dashboards")}</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/#" className="has-arrow">
//               <i className="bx bx-data" />
//               <span>{this.props.t("Master")}</span>
//             </Link>
//             <ul className="sub-menu" aria-expanded="false">
//               <li>
//                 <Link to="/admin/master/category">
//                   {this.props.t("Category")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin/master/variant">
//                   {this.props.t("Variant")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin/master/product">
//                   {this.props.t("Product ")}
//                 </Link>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <Link to="/#" className="has-arrow">
//               <i className="bx bx-store" />
//               <span>{this.props.t("Konsumen")}</span>
//             </Link>
//             <ul className="sub-menu" aria-expanded="false">
//               <li>
//                 <Link to="/admin/konsumen/distributor">
//                   {this.props.t("Distributor")}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admin/konsumen/toko">
//                   {this.props.t("Toko")}
//                 </Link>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <Link to="/admin/transaction">
//               <i className="bx bx-money" />
//               <span>{this.props.t("Transaksi")}</span>
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/tagihan">
//               <i className="bx bx-receipt" />
//               <span>{this.props.t("Tagihan")}</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </SimpleBar>
//   </React.Fragment>
// );
//   }
// }
