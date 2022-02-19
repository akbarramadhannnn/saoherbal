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

import {
  ApiGetListCategory,
  ApiDeleteListCategory,
} from "../../../api/category";

const Index = ({ history }) => {
  const [isSubscribe, setIsSubscribe] = useState(true);
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
    setCategoryId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/admin/master/category/update/${id}`);
    },
    [history]
  );

  const handleGetData = useCallback(
    (search, page) => {
      if (isSubscribe) {
        ApiGetListCategory(search, page).then(response => {
          if (response) {
            const dataArr = [];
            if (response.status === 200) {
              for (let i = 0; i < response.result.data.length; i++) {
                dataArr.push({
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
                              response.result.data[i].category_id
                            )
                          }
                        >
                          <i className="mdi mdi-pencil font-size-16 text-warning me-1" />{" "}
                          Edit Data
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleClickDelete(
                              response.result.data[i].category_id
                            )
                          }
                        >
                          <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                          Hapus Data
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
                  //       handleClickUpdate(response.result.data[i].category_id);
                  //     },
                  //   },
                  //   {
                  //     iconClassName: "mdi mdi-delete font-size-18",
                  //     actClassName: "text-danger",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickDelete(response.result.data[i].category_id);
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

              setDataCategory(dataArr);
            } else if (response.status === 204) {
              setDataCategory(dataArr);
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
          setPagination(oldState => ({
            ...oldState,
            currentPage: 1,
          }));
        }
      }
    });
  }, [categoryId, handleCloseModal, handleGetData]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Kategori</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Kategori" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/admin/master/category/create"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus"></i> Tambah Data Kategori
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="12">
                    <InputSearch
                      value={search}
                      onChange={handleChangeSearch}
                      placeholder="nama kategori.."
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
                      column={["Nama Kategori", "Aksi"]}
                      row={dataCategory}
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
