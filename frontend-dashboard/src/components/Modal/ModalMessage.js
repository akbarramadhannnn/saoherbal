import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader } from "reactstrap";

const ModalMessage = ({ isOpen, params, message, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered
      data-toggle="modal"
      toggle={onClose}
    >
      <div>
        <ModalHeader className="border-bottom-0" toggle={onClose}></ModalHeader>
      </div>
      <div className="modal-body">
        <div className="text-center mb-4">
          <div className="avatar-md mx-auto mb-4">
            {params === "success" && (
              <div className="avatar-title bg-success rounded-circle text-white h1">
                <i className="bx bx-comment-check font-size-40"></i>
              </div>
            )}
            {params === "danger" && (
              <div className="avatar-title bg-danger rounded-circle text-white h1">
                <i className="mdi mdi-alert-circle-outline font-size-40"></i>
              </div>
            )}
          </div>

          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h4 className={`text-${params}`}>{message}</h4>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

ModalMessage.propTypes = {
  isOpen: PropTypes.bool,
  params: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
};

export default memo(ModalMessage);
