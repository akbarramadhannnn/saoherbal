import React from "react";
import PropTypes from "prop-types";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

const Index = ({
  isOpen = false,
  title = "",
  message = "",
  bgColor = "",
  onClose = () => {},
}) => {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
      <Toast isOpen={isOpen}>
        <ToastHeader
          className={`${
            bgColor === "success"
              ? "bg-success"
              : bgColor === "danger"
              ? "bg-danger"
              : "bg-secondary"
          } text-white`}
          toggle={onClose}
        >
          {title}
        </ToastHeader>
        <ToastBody
          className={`${
            bgColor === "success"
              ? "bg-success"
              : bgColor === "danger"
              ? "bg-danger"
              : "bg-secondary"
          } text-white`}
        >
          {message}
        </ToastBody>
      </Toast>
    </div>
  );
};

Index.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  bgColor: PropTypes.string,
  onClose: PropTypes.func,
};

export default Index;
