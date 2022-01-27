import React, { memo } from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Index = ({
  isOpen,
  title,
  description,
  onClose,
  onSubmit,
  tetxButtonLeft,
  tetxButtonRight,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{description}</ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>{tetxButtonLeft}</Button>
        <Button color="primary" onClick={onSubmit}>
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
};

export default memo(Index);
