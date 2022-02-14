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
  Badge,
  Button,
} from "reactstrap";
import Table from "./../../components/Table";
import ModalLoading from "./../../components/Modal/ModalLoading";
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
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    // const controller = new AbortController();
    // return () => controller.abort();
    handleGetData();
    return () => {
      setIsSubscribe(false);
    };
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

  const handleGetData = useCallback(() => {
    if (isSubscribe) {
      setIsLoading(true);
      ApiGetListTransaction().then(response => {
        if (response) {
          const dataArrAll = [];
          const dataArrTitip = [];
          const dataArrTempo = [];
          if (response.status === 200) {
            for (let i = 0; i < response.result.length; i++) {
              if (
                response.result[i].transaction_type === "titip" &&
                response.result[i].status === "0"
              ) {
                dataArrTitip.push({
                  jenisTransaction: (
                    <span className={`badge badge-soft-info font-size-12 p-1`}>
                      {response.result[i].transaction_type.toUpperCase()}
                    </span>
                  ),
                  code: response.result[i].code,
                  consumerType: response.result[i].consumer_type,
                  consumer: response.result[i].consumer.name,
                  dueDate: `${moment(
                    response.result[i].dueDate.start_date
                  ).format("Do MMMM YYYY")} s.d. ${moment(
                    response.result[i].dueDate.end_date
                  ).format("Do MMMM YYYY")}`,
                  status: (
                    <span
                      className={`badge badge-soft-${
                        response.result[i].dueDate
                          .status_transaction_due_date === "0"
                          ? "warning"
                          : response.result[i].dueDate
                              .status_transaction_due_date === "1"
                          ? "danger"
                          : "success"
                      } font-size-12 p-1`}
                    >
                      {response.result[i].dueDate
                        .status_transaction_due_date === "0" &&
                        "Sedang Berlangsung"}
                      {response.result[i].dueDate
                        .status_transaction_due_date === "1" &&
                        "Lewat Masa Tenggang"}
                      {response.result[i].dueDate
                        .status_transaction_due_date === "2" && "Sudah Selesai"}
                    </span>
                  ),
                  createdBy: response.result[i].employee.name,
                  transactionDate: `${moment(
                    response.result[i].date_transaction
                  ).format("Do MMMM YYYY")} Pkl ${moment(
                    response.result[i].date_transaction
                  ).format("H:mm:ss")}`,
                  actions: [
                    {
                      iconClassName: "fas fa-eye font-size-20",
                      actClassName: "text-primary",
                      text: "",
                      onClick: () => {
                        handleClickDetailTransaction(response.result[i].code);
                      },
                    },
                    {
                      iconClassName: "fas fa-map-marker-alt font-size-20",
                      actClassName: "text-warning",
                      text: "",
                      onClick: () => {
                        handleClickDetailMaps(
                          response.result[i].consumer.latitude,
                          response.result[i].consumer.longitude
                        );
                      },
                    },
                  ],
                });
              } else if (
                response.result[i].transaction_type === "tempo" &&
                response.result[i].status === "0"
              ) {
                dataArrTempo.push({
                  jenisTransaction: (
                    <span
                      className={`badge badge-soft-warning font-size-12 p-1`}
                    >
                      {response.result[i].transaction_type.toUpperCase()}
                    </span>
                  ),
                  code: response.result[i].code,
                  consumerType: response.result[i].consumer_type,
                  consumer: response.result[i].consumer.name,
                  dueDate: `${moment(
                    response.result[i].dueDate.start_date
                  ).format("Do MMMM YYYY")} s.d. ${moment(
                    response.result[i].dueDate.end_date
                  ).format("Do MMMM YYYY")}`,
                  status: (
                    <span
                      className={`badge badge-soft-${
                        response.result[i].dueDate
                          .status_transaction_due_date === "0"
                          ? "warning"
                          : response.result[i].dueDate
                              .status_transaction_due_date === "1"
                          ? "danger"
                          : "success"
                      } font-size-12 p-1`}
                    >
                      {response.result[i].dueDate
                        .status_transaction_due_date === "0" &&
                        "Sedang Berlangsung"}
                      {response.result[i].dueDate
                        .status_transaction_due_date === "1" &&
                        "Lewat Masa Tempo"}
                      {response.result[i].dueDate
                        .status_transaction_due_date === "2" && "Sudah Selesai"}
                    </span>
                  ),
                  createdBy: response.result[i].employee.name,
                  transactionDate: `${moment(
                    response.result[i].date_transaction
                  ).format("Do MMMM YYYY")} Pkl ${moment(
                    response.result[i].date_transaction
                  ).format("H:mm:ss")}`,
                  actions: [
                    {
                      iconClassName: "fas fa-eye font-size-20",
                      actClassName: "text-primary",
                      text: "",
                      onClick: () => {
                        handleClickDetailTransaction(response.result[i].code);
                      },
                    },
                    {
                      iconClassName: "fas fa-map-marker-alt font-size-20",
                      actClassName: "text-warning",
                      text: "",
                      onClick: () => {
                        handleClickDetailMaps(
                          response.result[i].consumer.latitude,
                          response.result[i].consumer.longitude
                        );
                      },
                    },
                  ],
                });
              } else {
                dataArrAll.push({
                  jenisTransaction: (
                    <span
                      className={`badge badge-soft-${
                        response.result[i].transaction_type === "cash"
                          ? "primary"
                          : response.result[i].transaction_type === "tempo"
                          ? "warning"
                          : "info"
                      } font-size-12 p-1`}
                    >
                      {response.result[i].transaction_type.toUpperCase()}
                    </span>
                  ),
                  code: response.result[i].code,
                  consumerType: response.result[i].consumer_type,
                  consumer: response.result[i].consumer.name,
                  status: (
                    <span className="badge badge-soft-success font-size-12 p-1">
                      Sudah Selesai
                    </span>
                  ),
                  createdBy: response.result[i].employee.name,
                  transactionDate: `${moment(
                    response.result[i].date_transaction
                  ).format("Do MMMM YYYY")} Pkl ${moment(
                    response.result[i].date_transaction
                  ).format("H:mm:ss")}`,
                  actions: [
                    {
                      iconClassName: "fas fa-eye font-size-20",
                      actClassName: "text-primary",
                      text: "",
                      onClick: () => {
                        handleClickDetailTransaction(response.result[i].code);
                      },
                    },
                    {
                      iconClassName: "fas fa-map-marker-alt font-size-20",
                      actClassName: "text-warning",
                      text: "",
                      onClick: () => {
                        handleClickDetailMaps(
                          response.result[i].consumer.latitude,
                          response.result[i].consumer.longitude
                        );
                      },
                    },
                  ],
                });
              }
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
  }, [handleClickDetailTransaction, handleClickDetailMaps, isSubscribe]);

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
        <title>Transaksi</title>
      </MetaTags>

      <div className="container-fluid">
        <h4>Transaksi</h4>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
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
                      Add New Transaction
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-3 mt-4 align-items-center">
                  <Col md="10">
                    <Nav pills className="navtab-bg">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "1",
                          })}
                          onClick={() => {
                            setActiveTab("1");
                          }}
                        >
                          Semua
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "2",
                          })}
                          onClick={() => {
                            setActiveTab("2");
                          }}
                        >
                          Titip
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === "3",
                          })}
                          onClick={() => {
                            setActiveTab("3");
                          }}
                        >
                          Tempo
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>

                  <Col md="2" className="text-end">
                    <Button color="light" onClick={handleGetData}>
                      <i className="bx bx-revision font-size-15"></i>
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    {activeTab === "1" && (
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

                    {activeTab === "2" && (
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

                    {activeTab === "3" && (
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
