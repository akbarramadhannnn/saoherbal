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

import {
  ApiGetListCategory,
  ApiDeleteListCategory,
} from "../../../api/category";

const Index = ({ history }) => {
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
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
    setCategoryId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/master/category/update/${id}`);
    },
    [history]
  );

  const handleGetData = useCallback(() => {
    setIsLoading(true);
    ApiGetListCategory().then(response => {
      if (response) {
        const dataArr = [];
        if (response.status === 200) {
          for (let i = 0; i < response.result.length; i++) {
            dataArr.push({
              name: response.result[i].name,
              actions: [
                {
                  iconClassName: "mdi mdi-pencil font-size-18",
                  actClassName: "text-warning",
                  text: "",
                  onClick: () => {
                    handleClickUpdate(response.result[i].category_id);
                  },
                },
                {
                  iconClassName: "mdi mdi-delete font-size-18",
                  actClassName: "text-danger",
                  text: "",
                  onClick: () => {
                    handleClickDelete(response.result[i].category_id);
                  },
                },
              ],
            });
          }
          setDataCategory(dataArr);
        } else if (response.status === 204) {
          setDataCategory(dataArr);
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
    setCategoryId("");
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
    ApiDeleteListCategory(categoryId).then(response => {
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
  }, [categoryId, handleCloseModal, handleGetData]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Category</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Category" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/master/category/create"
                      className="btn btn-primary"
                    >
                      Add New Category
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
                      column={["Category Name", "Actions"]}
                      row={dataCategory}
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
