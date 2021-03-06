import React, { Component, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import TopHeader2 from "./TopBar2";
import BurgerMenus from "./BurgerMenus";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

const Header2 = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  return (
    <React.Fragment>
      <header>
        {/* <TopHeader2/> */}
        <div id="sticky-header" className="main-menu-area menu-area-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                <div className="logo">
                  <Link href="/" as="/">
                    <h3>
                      {/* <img className="standard-logo"
											     src={require("../../public/assets/img/logo/logo.png")}
											     alt="logo"/>
											<img className="retina-logo"
											     src={require("../../public/assets/img/logo/logo@2x.png")}
											     alt="logo@2x"/> */}
                      SAO Herbal
                    </h3>
                  </Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 d-none d-xl-block d-lg-block">
                <div className="main-menu text-right f-right">
                  <nav id="mobile-menu">
                    <ul>
                      <li>
                        <Link href="/" as="/">
                          <a>home</a>
                        </Link>
                      </li>
                      <li className={path === "/katalog" ? "active" : ""}>
                        <Link href="/katalog" as="/katalog">
                          <a>Katalog</a>
                        </Link>
                      </li>
                      <li className={path === "/tentang" ? "active" : ""}>
                        <Link href="/tentang" as="/tentang">
                          <a>Tentang</a>
                        </Link>
                      </li>
                      <li className={path === "/kontak" ? "active" : ""}>
                        <Link href="/kontak" as="/kontak">
                          <a>Kontak</a>
                        </Link>
                      </li>
                      <li className={path === "/pertanyaan" ? "active" : ""}>
                        <Link href="/pertanyaan" as="/pertanyaan">
                          <a>Pertanyaan</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="d-block d-xl-none d-lg-none col-md-8 col-6 text-right">
                <div className="menu-bar">
                  <button
                    className="bars"
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    <i>
                      {" "}
                      <FontAwesomeIcon icon={["fas", "bars"]} />
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BurgerMenus menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div
          onClick={() => setMenuOpen(false)}
          className={menuOpen ? "body-overlay show" : "body-overlay"}
        ></div>

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <SearchBar
          searchBarOpen={searchBarOpen}
          setSearchBarOpen={setSearchBarOpen}
        />
      </header>
    </React.Fragment>
  );
};

export default Header2;
