import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Modal from "../../../components/Modal";
import Alert from "./../../../components/Alert";
import Table from "./../../../components/Table";
import { Link } from "react-router-dom";

import { ApiGetListProduct, ApiDeleteListProduct } from "../../../api/product";

const Index = ({ history }) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    description: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleClickDelete = useCallback(id => {
    setModal(oldState => ({
      ...oldState,
      isOpen: true,
      title: "Confirmation",
      description: "Apakah anda yakin ingin menghapus data ini ?",
    }));
    setProductId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/master/product/update/${id}`);
    },
    [history]
  );

  const handleGetData = useCallback(() => {
    setIsLoading(true);
    ApiGetListProduct().then(response => {
      if (response) {
        const dataArr = [];
        if (response.status === 200) {
          for (let i = 0; i < response.result.length; i++) {
            dataArr.push({
              category: response.result[i].category.name,
              variant: response.result[i].variant.name,
              name: response.result[i].product_name,
              actions: [
                {
                  iconClassName: "mdi mdi-pencil font-size-18",
                  actClassName: "text-warning",
                  text: "",
                  onClick: () => {
                    handleClickUpdate(response.result[i].product_id);
                  },
                },
                {
                  iconClassName: "mdi mdi-delete font-size-18",
                  actClassName: "text-danger",
                  text: "",
                  onClick: () => {
                    handleClickDelete(response.result[i].product_id);
                  },
                },
              ],
            });
          }
          setDataProduct(dataArr);
        } else if (response.status === 204) {
          setDataProduct(dataArr);
        }
      }
      setIsLoading(false);
    });
  }, [handleClickUpdate, handleClickDelete]);

  const handleCloseModal = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      description: "",
    }));
    setProductId("");
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      message: "",
    }));
  }, []);

  const handleSubmitDelete = useCallback(() => {
    ApiDeleteListProduct(productId).then(response => {
      if (response) {
        if (response.status === 200) {
          handleCloseModal();
          setAlert(oldState => ({
            ...oldState,
            isOpen: true,
            title: "Success",
            message: response.message,
          }));
          handleGetData();
        }
      }
    });
  }, [productId, handleCloseModal, handleGetData]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Product</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Product" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/master/product/create"
                      className="btn btn-primary"
                    >
                      Add New Product
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <Alert
                      isOpen={alert.isOpen}
                      title={alert.title}
                      message={alert.message}
                      color="success"
                      toggle={handleCloseAlert}
                    />
                    <Table
                      column={[
                        "Category",
                        "Variant",
                        "Product Name",
                        "Actions",
                      ]}
                      row={dataProduct}
                      isLoading={isLoading}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        description={modal.description}
        onClose={handleCloseModal}
        tetxButtonLeft="Cancel"
        tetxButtonRight="Ya, Hapus"
        onSubmit={handleSubmitDelete}
      />
    </div>
  );
};

Index.propTypes = {
  history: PropTypes.object,
};

export default Index;
