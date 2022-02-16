import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Modal from "../../../components/Modal";
import Alert from "../../../components/Alert";
import Table from "../../../components/Table";
import InputSearch from "../../../components/Input/InputSearch";
import Pagination from "../../../components/Pagination";

import { Link } from "react-router-dom";

import { ApiGetListStore, ApiDeleteListStore } from "../../../api/store";

const Index = ({ history }) => {
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [dataStore, setDataStore] = useState([]);
  const [storeId, setStoreId] = useState([]);
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
    return () => {
      setIsSubscribe(false);
    };
  }, []);

  const handleClickDelete = useCallback(id => {
    setModal(oldState => ({
      ...oldState,
      isOpen: true,
      title: "Confirmation",
      description: "Apakah anda yakin ingin menghapus data ini ?",
    }));
    setStoreId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/admin/konsumen/toko/update/${id}`);
    },
    [history]
  );

  const handleGetData = useCallback(() => {
    if (isSubscribe) {
      setIsLoading(true);
      ApiGetListStore().then(response => {
        if (response) {
          const dataArr = [];
          if (response.status === 200) {
            for (let i = 0; i < response.result.length; i++) {
              dataArr.push({
                name: response.result[i].name,
                provinsi: response.result[i].provinsi.name,
                kabupaten: response.result[i].kabupaten.name,
                actions: [
                  {
                    iconClassName: "mdi mdi-pencil font-size-18",
                    actClassName: "text-warning",
                    text: "",
                    onClick: () => {
                      handleClickUpdate(response.result[i].store_id);
                    },
                  },
                  {
                    iconClassName: "mdi mdi-delete font-size-18",
                    actClassName: "text-danger",
                    text: "",
                    onClick: () => {
                      handleClickDelete(response.result[i].store_id);
                    },
                  },
                ],
              });
            }
            setDataStore(dataArr);
          } else if (response.status === 204) {
            setDataStore(dataArr);
          }
        }
        setIsLoading(false);
      });
    }
  }, [handleClickUpdate, handleClickDelete, isSubscribe]);

  const handleCloseModal = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      description: "",
    }));
    setStoreId("");
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
    ApiDeleteListStore(storeId).then(response => {
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
  }, [storeId, handleCloseModal, handleGetData]);

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
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/admin/konsumen/toko/create"
                      className="btn btn-primary"
                    >
                      Add New Store
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="12">
                    <InputSearch />
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
                        "Store Name",
                        "Provinsi",
                        "Kabupaten",
                        "Actions",
                      ]}
                      row={dataStore}
                      isLoading={isLoading}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Pagination />
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
