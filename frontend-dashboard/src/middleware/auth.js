import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const NonAuthmiddleware = ({
  component: Component,
  layout: Layout,
  isAuth,
}) => (
  <Route
    render={props => {
      if (isAuth === true) {
        return (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: props.location } }}
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
};

Authmiddleware.propTypes = {
  isAuth: PropTypes.any,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export { NonAuthmiddleware, Authmiddleware };
