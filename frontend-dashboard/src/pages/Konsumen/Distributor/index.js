import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
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
  ApiGetListDistributor,
  ApiDeleteListDistributor,
} from "../../../api/distributor";

const Index = ({ history }) => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [dataDistributor, setDataDistributor] = useState([]);
  const [distributorId, setDstributorId] = useState([]);
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
    setDstributorId(id);
  }, []);

  const handleClickUpdate = useCallback(
    id => {
      // history.push(`/admin/konsumen/distributor/update/${id}`);
      history.push(
        `${
          position === "0" ? "/admin" : position === "2" ? "/sales" : ""
        }/konsumen/distributor/update/${id}`
      );
    },
    [history, position]
  );

  const handleClickDetailMaps = useCallback(
    (lat, long) => {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${lat},${long}`
      );
      // history.push(`/transaction/detail/${transactionCode}`);
    },
    [history]
  );

  const handleGetData = useCallback(
    (search, page) => {
      if (isSubscribe) {
        ApiGetListDistributor(search, page).then(response => {
          if (response) {
            const dataArr = [];
            if (response.status === 200) {
              for (let i = 0; i < response.result.data.length; i++) {
                dataArr.push({
                  name: response.result.data[i].name,
                  provinsi: response.result.data[i].provinsi.name,
                  kabupaten: response.result.data[i].kabupaten.name,
                  createdBy: response.result.data[i].employee.name,
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
                              response.result.data[i].distributor_id
                            )
                          }
                        >
                          <i className="mdi mdi-pencil text-secondary me-1" />{" "}
                          <span className="text-secondary">Edit Data</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleClickDelete(
                              response.result.data[i].distributor_id
                            )
                          }
                        >
                          <i className="mdi mdi-trash-can text-secondary me-1" />{" "}
                          <span className="text-secondary">Hapus Data</span>
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleClickDetailMaps(
                              response.result.data[i].latitude,
                              response.result.data[i].longitude
                            )
                          }
                        >
                          <i className="mdi mdi-map-marker text-secondary me-1" />{" "}
                          <span className="text-secondary">Lihat Lokasi</span>
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
                  //       handleClickUpdate(
                  //         response.result.data[i].distributor_id
                  //       );
                  //     },
                  //   },
                  //   {
                  //     iconClassName: "mdi mdi-delete font-size-18",
                  //     actClassName: "text-danger",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickDelete(
                  //         response.result.data[i].distributor_id
                  //       );
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

              setDataDistributor(dataArr);
            } else if (response.status === 204) {
              setDataDistributor(dataArr);
            }
          }
          setIsLoading(false);
        });
      }
    },
    [handleClickUpdate, handleClickDelete, handleClickDetailMaps, isSubscribe]
  );

  const handleCloseModal = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      description: "",
    }));
    setDstributorId("");
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
    ApiDeleteListDistributor(distributorId).then(response => {
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
  }, [distributorId, handleCloseModal, handleGetData]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Distributor | SAO Herbal</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Distributor" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to={`${
                        position === "0"
                          ? "/admin"
                          : position === "2"
                          ? "/sales"
                          : ""
                      }/konsumen/distributor/create`}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus"></i> Tambah Data Distributor
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="12">
                    <InputSearch
                      value={search}
                      onChange={handleChangeSearch}
                      placeholder="nama distributor.."
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
                      column={[
                        "Nama Distributor",
                        "Provinsi",
                        "Kabupaten",
                        "Dibuat Oleh",
                        "Aksi",
                      ]}
                      row={dataDistributor}
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
