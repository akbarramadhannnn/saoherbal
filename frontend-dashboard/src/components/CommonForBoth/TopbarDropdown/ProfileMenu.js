import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

import { withTranslation } from "react-i18next";

import user1 from "../../../assets/images/users/avatar-1.jpg";
import { LOAD_USER } from "../../../store/auth/actionsTypes";

const ProfileMenu = props => {
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch({
      type: LOAD_USER,
      payload: {
        isAuth: false,
        user: {},
      },
    });
    localStorage.removeItem("token");
  }, [dispatch]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isMenu}
        toggle={() => setIsMenu(!isMenu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />{" "}
          <span className="d-none d-xl-inline-block ms-1">
            {/* {this.state.name} */}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {/* <DropdownItem tag="a" href="/profile">
            <i className="bx bx-user font-size-16 align-middle ms-1" />
            {this.props.t("Profile")}
          </DropdownItem>
          <DropdownItem tag="a" href="/crypto-wallet">
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {this.props.t("My Wallet")}
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span>
            <i className="bx bx-wrench font-size-17 align-middle me-1" />
            {this.props.t("Settings")}
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {this.props.t("Lock screen")}
          </DropdownItem>
          <div className="dropdown-divider" /> */}
          <Link to="#" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span onClick={handleLogout}>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  t: PropTypes.any,
  success: PropTypes.string,
};

export default withRouter(withTranslation()(ProfileMenu));
