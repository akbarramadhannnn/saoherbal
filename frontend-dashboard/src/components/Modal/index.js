import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Index = ({
  isOpen = false,
  title = "",
  description = "",
  children,
  onClose = () => {},
  onSubmit = () => {},
  tetxButtonLeft = "",
  tetxButtonRight = "",
  isDisabledButtonLeft = false,
  isDisabledButtonRight = false,
  size,
}) => {
  return (
    <Modal isOpen={isOpen} size={size}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {description && description}
        {children && children}
      </ModalBody>
      <ModalFooter>
        <Button disabled={isDisabledButtonLeft} onClick={onClose}>
          {tetxButtonLeft}
        </Button>
        <Button
          disabled={isDisabledButtonRight}
          color="primary"
          onClick={onSubmit}
        >
          {tetxButtonRight}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

Index.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  tetxButtonLeft: PropTypes.string,
  tetxButtonRight: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  isDisabledButtonLeft: PropTypes.bool,
  isDisabledButtonRight: PropTypes.bool,
  size: PropTypes.string,
};

export default memo(Index);
