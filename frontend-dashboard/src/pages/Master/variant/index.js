import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Modal from "../../../components/Modal";
import Alert from "../../../components/Alert";
import Table from "../../../components/Table";
import InputSearch from "../../../components/Input/InputSearch";
import Pagination from "../../../components/Pagination";

import { Link } from "react-router-dom";

import { ApiGetListVariant, ApiDeleteListVariant } from "../../../api/variant";

const Index = ({ history }) => {
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [dataVariant, setDataVariant] = useState([]);
  const [variantId, setVariantId] = useState([]);
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
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 1,
    nextPage: 0,
    prevPage: 0,
  });

  useEffect(() => {
    return () => {
      setIsSubscribe(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (search || pagination.currentPage) {
      let timeout;
      timeout = setTimeout(() => {
        setIsSubscribe(true);
        handleGetData(search, pagination.currentPage);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      handleGetData();
    }
  }, [search, pagination.currentPage]);

  const handleChangeSearch = useCallback(e => {
    const { value } = e.target;
    setPagination({
      totalPage: 0,
      currentPage: 1,
      nextPage: 0,
      prevPage: 0,
    });
    setSearch(value);
  }, []);

  const handleClickDelete = useCallback(id => {
    setModal(oldState => ({
      ...oldState,
      isOpen: true,
      title: "Confirmation",
      description: "Apakah anda yakin ingin menghapus data ini ?",
    }));
    setVariantId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/admin/master/variant/update/${id}`);
    },
    [history]
  );

  const handleGetData = useCallback(
    (search, page) => {
      if (isSubscribe) {
        ApiGetListVariant(search, page).then(response => {
          if (response) {
            const dataArr = [];
            if (response.status === 200) {
              for (let i = 0; i < response.result.data.length; i++) {
                dataArr.push({
                  category: response.result.data[i].category.name,
                  name: response.result.data[i].name,
                  actions: (
                    <UncontrolledDropdown>
                      <DropdownToggle href="#" className="card-drop" tag="i">
                        <i
                          style={{ cursor: "pointer" }}
                          className="mdi mdi-dots-horizontal font-size-18"
                        />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem
                          onClick={() =>
                            handleClickUpdate(
                              response.result.data[i].variant_id
                            )
                          }
                        >
                          <i className="mdi mdi-pencil text-secondary me-1" />{" "}
                          <span className="text-secondary">Edit Data</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleClickDelete(
                              response.result.data[i].variant_id
                            )
                          }
                        >
                          <i className="mdi mdi-trash-can text-secondary me-1" />{" "}
                          <span className="text-secondary">Hapus Data</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ),
                  // actions: [
                  //   {
                  //     iconClassName: "mdi mdi-pencil font-size-18",
                  //     actClassName: "text-warning",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickUpdate(response.result.data[i].variant_id);
                  //     },
                  //   },
                  //   {
                  //     iconClassName: "mdi mdi-delete font-size-18",
                  //     actClassName: "text-danger",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickDelete(response.result.data[i].variant_id);
                  //     },
                  //   },
                  // ],
                });
              }

              if (
                !response.result.pagination.next &&
                !response.result.pagination.prev
              ) {
                setPagination(oldState => ({
                  ...oldState,
                  totalPage: response.result.totalPage,
                }));
              } else {
                if (response.result.pagination.next) {
                  setPagination(oldState => ({
                    ...oldState,
                    nextPage: response.result.pagination.next.page,
                  }));
                } else {
                  setPagination(oldState => ({
                    ...oldState,
                    nextPage: 0,
                  }));
                }

                if (response.result.pagination.prev) {
                  setPagination(oldState => ({
                    ...oldState,
                    prevPage: response.result.pagination.prev.page,
                  }));
                } else {
                  setPagination(oldState => ({
                    ...oldState,
                    prevPage: 0,
                  }));
                }

                setPagination(oldState => ({
                  ...oldState,
                  totalPage: response.result.totalPage,
                }));
              }

              setDataVariant(dataArr);
            } else if (response.status === 204) {
              setDataVariant(dataArr);
            }
          }
          setIsLoading(false);
        });
      }
    },
    [handleClickUpdate, handleClickDelete, isSubscribe]
  );

  const handleCloseModal = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      description: "",
    }));
    setVariantId("");
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
    ApiDeleteListVariant(variantId).then(response => {
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
  }, [variantId, handleCloseModal, handleGetData]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Varian | SAO Herbal</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Varian" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/admin/master/variant/create"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus"></i> Tambah Data Varian
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="12">
                    <InputSearch
                      value={search}
                      onChange={handleChangeSearch}
                      placeholder="nama varian..."
                    />
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
                      column={["Nama Kategori", "Nama Varian", "Aksi"]}
                      row={dataVariant}
                      isLoading={isLoading}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Pagination
                    totalPage={pagination.totalPage}
                    currentPage={pagination.currentPage}
                    nextPage={pagination.nextPage}
                    prevPage={pagination.prevPage}
                    setPagination={setPagination}
                  />
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
