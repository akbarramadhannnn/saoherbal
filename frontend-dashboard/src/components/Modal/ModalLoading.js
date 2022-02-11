import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal, Spinner } from "reactstrap";

const ModalLoading = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered
      //   toggle={() => {}}
    >
      {/* <div>
        <ModalHeader
          className="border-bottom-0"
          toggle={() => {}}
        ></ModalHeader>
      </div> */}
      <div className="d-flex flex-column align-items-center pt-4 pb-4 text-primary">
        <div className="mb-1">
          <Spinner />
        </div>
        <div>Loading...</div>
      </div>
    </Modal>
  );
};

ModalLoading.propTypes = {
  isOpen: PropTypes.bool,
};

export default memo(ModalLoading);
