import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/Table";
import ModalLoading from "../../components/Modal/ModalLoading";
import InputSearch from "../../components/Input/InputSearch";
import Pagination from "../../components/Pagination";
import { ConvertToRupiah } from "./../../utils/convert";

import {
  ApiGetListTransaction,
  ApiDetailListTransaction,
} from "../../api/transaction";

import { ApiGeneratePdfInvoiceTransaction } from "../../api/file";

import moment from "../../lib/moment";

import classnames from "classnames";

const Index = ({ history }) => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [dataTransactionAll, setDataTransactionAll] = useState([]);
  const [dataTransactionTitip, setDataTransactionTitip] = useState([]);
  const [dataTransactionTempo, setDataTransactionTempo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 1,
    nextPage: 0,
    prevPage: 0,
  });

  useEffect(() => {
    // const controller = new AbortController();
    // return () => controller.abort();
    // handleGetData();
    return () => {
      setIsSubscribe(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (search || activeTab || pagination.currentPage) {
      let timeout;
      timeout = setTimeout(() => {
        setIsSubscribe(true);
        handleGetData(search, activeTab, pagination.currentPage);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      handleGetData();
    }
  }, [search, activeTab, pagination.currentPage]);

  const handleChangeSearch = useCallback(e => {
    const { value } = e.target;
    setPagination(oldState => ({
      ...oldState,
      totalPage: 0,
      currentPage: 1,
      nextPage: 0,
      prevPage: 0,
    }));
    setSearch(value);
  }, []);

  const handleClickCetakTransaction = useCallback(code => {
    setIsModalLoading(true);
    ApiDetailListTransaction(code).then(response => {
      if (response) {
        if (response.status === 200) {
          const payload = {
            data: response.result,
          };
          ApiGeneratePdfInvoiceTransaction(payload).then(responseInvoice => {
            if (responseInvoice.status === 201) {
              let newwindow = window.open(`${responseInvoice.result.url}`);
              if (window.focus) {
                newwindow.focus();
              }
              setIsModalLoading(false);
            }
          });
        }
      }
    });
  }, []);

  const handleClickTab = useCallback(value => {
    setPagination(oldState => ({
      ...oldState,
      totalPage: 0,
      currentPage: 1,
      nextPage: 0,
      prevPage: 0,
    }));
    setActiveTab(value);
  }, []);

  const handleClickDetailTransaction = useCallback(
    transactionCode => {
      history.push(
        `${
          position === "0" ? "/admin" : position === "2" ? "/sales" : ""
        }/transaction/detail/${transactionCode}`
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
    (search, transactionType, page) => {
      if (isSubscribe) {
        ApiGetListTransaction(search, transactionType, page).then(response => {
          if (response) {
            const dataArrAll = [];
            const dataArrTitip = [];
            const dataArrTempo = [];
            if (response.status === 200) {
              for (let i = 0; i < response.result.data.length; i++) {
                if (
                  response.result.data[i].transaction_type === "titip" &&
                  response.result.data[i].status === "0"
                ) {
                  dataArrTitip.push({
                    jenisTransaction: (
                      <span
                        className={`badge badge-soft-info font-size-12 p-1`}
                      >
                        {response.result.data[i].transaction_type.toUpperCase()}
                      </span>
                    ),
                    code: response.result.data[i].code,
                    consumerType: response.result.data[i].consumer_type,
                    consumer: response.result.data[i].consumer.name,
                    dueDate: `${moment(
                      response.result.data[i].dueDate.start_date
                    ).format("Do MMMM YYYY")} s.d. ${moment(
                      response.result.data[i].dueDate.end_date
                    ).format("Do MMMM YYYY")}`,
                    status: (
                      <span
                        className={`badge badge-soft-${
                          response.result.data[i].dueDate
                            .status_transaction_due_date === "0"
                            ? "warning"
                            : response.result.data[i].dueDate
                                .status_transaction_due_date === "1"
                            ? "danger"
                            : "success"
                        } font-size-12 p-1`}
                      >
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "0" &&
                          "Sedang Berlangsung"}
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "1" &&
                          "Lewat Masa Tenggang"}
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "2" &&
                          "Sudah Selesai"}
                      </span>
                    ),
                    createdBy: response.result.data[i].employee.name,
                    transactionDate: `${moment(
                      response.result.data[i].date_transaction
                    ).format("Do MMMM YYYY")} Pkl ${moment(
                      response.result.data[i].date_transaction
                    ).format("H:mm:ss")}`,
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
                              handleClickDetailTransaction(
                                response.result.data[i].code
                              )
                            }
                          >
                            <i className="mdi mdi-eye font-size-16 text-info me-1" />{" "}
                            Lihat Detail
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ),
                    // actions: [
                    //   {
                    //     iconClassName: "fas fa-eye font-size-20",
                    //     actClassName: "text-primary",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailTransaction(
                    //         response.result.data[i].code
                    //       );
                    //     },
                    //   },
                    //   {
                    //     iconClassName: "fas fa-map-marker-alt font-size-20",
                    //     actClassName: "text-warning",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailMaps(
                    //         response.result.data[i].consumer.latitude,
                    //         response.result.data[i].consumer.longitude
                    //       );
                    //     },
                    //   },
                    // ],
                  });
                } else if (
                  response.result.data[i].transaction_type === "tempo" &&
                  response.result.data[i].status === "0"
                ) {
                  dataArrTempo.push({
                    jenisTransaction: (
                      <span
                        className={`badge badge-soft-warning font-size-12 p-1`}
                      >
                        {response.result.data[i].transaction_type.toUpperCase()}
                      </span>
                    ),
                    code: response.result.data[i].code,
                    consumerType: response.result.data[i].consumer_type,
                    consumer: response.result.data[i].consumer.name,
                    dueDate: `${moment(
                      response.result.data[i].dueDate.start_date
                    ).format("Do MMMM YYYY")} s.d. ${moment(
                      response.result.data[i].dueDate.end_date
                    ).format("Do MMMM YYYY")}`,
                    status: (
                      <span
                        className={`badge badge-soft-${
                          response.result.data[i].dueDate
                            .status_transaction_due_date === "0"
                            ? "warning"
                            : response.result.data[i].dueDate
                                .status_transaction_due_date === "1"
                            ? "danger"
                            : "success"
                        } font-size-12 p-1`}
                      >
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "0" &&
                          "Sedang Berlangsung"}
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "1" &&
                          "Lewat Masa Tempo"}
                        {response.result.data[i].dueDate
                          .status_transaction_due_date === "2" &&
                          "Sudah Selesai"}
                      </span>
                    ),
                    createdBy: response.result.data[i].employee.name,
                    transactionDate: `${moment(
                      response.result.data[i].date_transaction
                    ).format("Do MMMM YYYY")} Pkl ${moment(
                      response.result.data[i].date_transaction
                    ).format("H:mm:ss")}`,
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
                              handleClickDetailTransaction(
                                response.result.data[i].code
                              )
                            }
                          >
                            <i className="mdi mdi-eye font-size-16 text-info me-1" />{" "}
                            Lihat Detail
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ),
                    // actions: [
                    //   {
                    //     iconClassName: "fas fa-eye font-size-20",
                    //     actClassName: "text-primary",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailTransaction(
                    //         response.result.data[i].code
                    //       );
                    //     },
                    //   },
                    //   {
                    //     iconClassName: "fas fa-map-marker-alt font-size-20",
                    //     actClassName: "text-warning",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailMaps(
                    //         response.result.data[i].consumer.latitude,
                    //         response.result.data[i].consumer.longitude
                    //       );
                    //     },
                    //   },
                    // ],
                  });
                } else {
                  dataArrAll.push({
                    jenisTransaction: (
                      <span
                        className={`badge badge-soft-${
                          response.result.data[i].transaction_type === "cash"
                            ? "primary"
                            : response.result.data[i].transaction_type ===
                              "tempo"
                            ? "warning"
                            : "info"
                        } font-size-12 p-1`}
                      >
                        {response.result.data[i].transaction_type.toUpperCase()}
                      </span>
                    ),
                    code: response.result.data[i].code,
                    consumerType: response.result.data[i].consumer_type,
                    consumer: response.result.data[i].consumer.name,
                    status: (
                      <span className="badge badge-soft-success font-size-12 p-1">
                        Sudah Selesai
                      </span>
                    ),
                    createdBy: response.result.data[i].employee.name,
                    transactionDate: `${moment(
                      response.result.data[i].date_transaction
                    ).format("Do MMMM YYYY")} Pkl ${moment(
                      response.result.data[i].date_transaction
                    ).format("H:mm:ss")}`,
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
                              handleClickDetailTransaction(
                                response.result.data[i].code
                              )
                            }
                          >
                            <i className="mdi mdi-eye font-size-16 text-info me-1" />{" "}
                            Lihat Detail
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ),
                    // actions: [
                    //   {
                    //     iconClassName: "fas fa-eye font-size-20",
                    //     actClassName: "text-primary",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailTransaction(
                    //         response.result.data[i].code
                    //       );
                    //     },
                    //   },
                    //   {
                    //     iconClassName: "fas fa-map-marker-alt font-size-20",
                    //     actClassName: "text-warning",
                    //     text: "",
                    //     onClick: () => {
                    //       handleClickDetailMaps(
                    //         response.result.data[i].consumer.latitude,
                    //         response.result.data[i].consumer.longitude
                    //       );
                    //     },
                    //   },
                    // ],
                  });
                }
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

              setDataTransactionAll(dataArrAll);
              setDataTransactionTitip(dataArrTitip);
              setDataTransactionTempo(dataArrTempo);
            } else if (response.status === 204) {
              setDataTransactionAll(dataArrAll);
              setDataTransactionAll(dataArrAll);
              setDataTransactionTitip(dataArrTitip);
              setDataTransactionTempo(dataArrTempo);
            }
          }
          setIsLoading(false);
        });
      }
    },
    [handleClickDetailTransaction, handleClickDetailMaps, isSubscribe]
  );

  const handleClickRefresh = useCallback(() => {
    setIsLoading(true);
    const page = 1;
    setPagination(oldState => ({
      ...oldState,
      totalPage: 0,
      currentPage: page,
      nextPage: 0,
      prevPage: 0,
    }));
    handleGetData(search, activeTab, page);
  }, [search, activeTab]);

  const listColAll = [
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-3",
    "col-3",
    "col-3",
    "col-1",
  ];

  const listColTempo = [
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-3",
    "col-2",
    "col-3",
    "col-3",
    "col-1",
  ];

  return (
    <div className="page-content">
      <MetaTags>
        <title>Transaksi | SAO Herbal</title>
      </MetaTags>

      <div className="container-fluid">
        <Breadcrumbs title="" breadcrumbItem="Transaksi" />

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
                      }/transaction/create`}
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus"></i> Tambah Data Transaksi
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="4">
                    <InputSearch
                      value={search}
                      onChange={handleChangeSearch}
                      placeholder="nama konsumen..."
                    />
                  </Col>
                </Row>

                <Row className="mb-3 mt-4 align-items-center">
                  <Col md="10">
                    <Nav pills className="navtab-bg">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "all",
                          })}
                          onClick={() => {
                            handleClickTab("all");
                          }}
                        >
                          Semua
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "titip",
                          })}
                          onClick={() => {
                            handleClickTab("titip");
                          }}
                        >
                          Titip
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "tempo",
                          })}
                          onClick={() => {
                            handleClickTab("tempo");
                          }}
                        >
                          Tempo
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>

                  <Col md="2" className="text-end">
                    <Button color="light" onClick={handleClickRefresh}>
                      <i className="bx bx-revision font-size-15"></i>
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    {activeTab === "all" && (
                      <Table
                        column={[
                          "Jenis Transaksi",
                          "Code",
                          "Tipe Konsumen",
                          "Konsumen",
                          "Status",
                          "Dibuat Oleh",
                          "Waktu Transaksi",
                          "Actions",
                        ]}
                        row={dataTransactionAll}
                        isLoading={isLoading}
                        col={isLoading ? [] : listColAll}
                      />
                    )}

                    {activeTab === "titip" && (
                      <Table
                        column={[
                          "Jenis Transaksi",
                          "Code",
                          "Tipe Konsumen",
                          "Konsumen",
                          "Waktu Masa Titip",
                          "Status",
                          "Dibuat Oleh",
                          "Waktu Transaksi",
                          "Actions",
                        ]}
                        row={dataTransactionTitip}
                        isLoading={isLoading}
                        col={isLoading ? [] : listColTempo}
                      />
                    )}

                    {activeTab === "tempo" && (
                      <Table
                        column={[
                          "Jenis Transaksi",
                          "Code",
                          "Tipe Konsumen",
                          "Konsumen",
                          "Waktu Masa Tempo",
                          "Status",
                          "Dibuat Oleh",
                          "Waktu Transaksi",
                          "Actions",
                        ]}
                        row={dataTransactionTempo}
                        isLoading={isLoading}
                        col={isLoading ? [] : listColTempo}
                      />
                    )}
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

      <ModalLoading isOpen={isModalLoading} />
    </div>
  );
};

Index.propTypes = {
  history: PropTypes.object,
};

export default Index;
