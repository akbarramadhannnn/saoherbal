import React, { memo } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const Index = ({ isOpen, title, message, toggle, color }) => {
  return (
    <Alert color={color} isOpen={isOpen} toggle={toggle}>
      <h4 className="alert-heading">{title && title}</h4>
      <p>{message && message}</p>
    </Alert>
  );
};

Index.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  toggle: PropTypes.func,
  color: PropTypes.string,
};

export default memo(Index);
