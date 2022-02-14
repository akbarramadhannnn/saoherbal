import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const NonAuthmiddleware = ({
  component: Component,
  layout: Layout,
  isAuth,
  position,
}) => (
  <Route
    render={props => {
      if (isAuth === true) {
        if (position === "0") {
          return (
            <Redirect
              to={{
                pathname: "/admin/dashboard",
                state: { from: props.location },
              }}
            />
          );
        } else if (position === "2") {
          return (
            <Redirect
              to={{
                pathname: "/sales/dashboard",
                state: { from: props.location },
              }}
            />
          );
        }
      }

      if (isAuth === "") {
        return null;
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuth,
  ...rest
}) => (
  <Route
    render={props => {
      if (isAuth === false) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      if (isAuth === "") {
        return null;
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
    {...rest}
  />
);

NonAuthmiddleware.propTypes = {
  isAuth: PropTypes.any,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
  position: PropTypes.any,
};

Authmiddleware.propTypes = {
  isAuth: PropTypes.any,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export { NonAuthmiddleware, Authmiddleware };
