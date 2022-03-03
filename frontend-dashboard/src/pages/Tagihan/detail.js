import React, { useState, useEffect, Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  Spinner,
  Badge,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Alert from "../../components/Alert";
import MetaTags from "react-meta-tags";
import moment from "../../lib/moment";
import { ConvertToRupiah } from "../../utils/convert";

import { ApiDetailListBill, ApiUpdatePaymentStatusBill } from "../../api/bill";

const Detail = ({ match }) => {
  const billNumber = match.params.billNumber;
  const [detailTagihan, setDetailTagihan] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    color: "",
    message: "",
  });

  useEffect(() => {
    setIsLoading(true);
    ApiDetailListBill(billNumber).then(response => {
      if (response) {
        if (response.status === 200) {
          setDetailTagihan(response.result);
        }
      }
      setIsLoading(false);
    });
  }, [billNumber]);

  const handleClickPayment = useCallback(() => {
    setIsDisabledButton(true);
    const payload = {
      type: "engineer",
      paymentStatus: "2",
    };
    ApiUpdatePaymentStatusBill(billNumber, payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "date") {
            setAlert(oldState => ({
              ...oldState,
              isOpen: true,
              title: "Notice",
              color: "danger",
              message: response.message,
            }));
          } else if (response.result.name === "paymentStatus") {
            setAlert(oldState => ({
              ...oldState,
              isOpen: true,
              title: "Notice",
              color: "danger",
              message: response.message,
            }));
          }
        } else if (response.status === 201) {
          setAlert(oldState => ({
            ...oldState,
            isOpen: true,
            title: "Notice",
            color: "success",
            message: response.message,
          }));
          setDetailTagihan(oldState => ({
            ...oldState,
            payment_status: response.result.status,
          }));
        }
      }
      setIsDisabledButton(false);
    });
  }, [billNumber]);

  const handleCloseAlert = useCallback(() => {
    setAlert(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      color: "",
      message: "",
    }));
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Detail Tagihan | SAO Herbal</title>
      </MetaTags>
      <Container fluid>
        <Breadcrumbs title="Tagihan" breadcrumbItem="Detail Tagihan" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                {isLoading && (
                  <div className="d-flex justify-content-center pt-5 pb-5 text-primary">
                    <Spinner />
                  </div>
                )}

                {!isLoading && (
                  <Fragment>
                    <Row>
                      <Col xs="6" className="mt-3">
                        <address>
                          <strong>No Tagihan</strong>
                          <br />
                          {detailTagihan.bill_number}
                          {/* <br /> */}
                          {/* {invoiceDetail.email} */}
                        </address>
                      </Col>
                      <Col xs="6" className="mt-3 text-end">
                        <address>
                          <strong>Bulan / Tanggal Tagihan:</strong>
                          <br />
                          {moment(detailTagihan.first_day).format(
                            "Do MMMM YYYY"
                          )}{" "}
                          -{" "}
                          {moment(detailTagihan.last_day).format(
                            "Do MMMM YYYY"
                          )}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" className="mt-3">
                        <address>
                          <strong>Status Pembayaran</strong>
                          <br />
                          {detailTagihan.payment_status === "0" ? (
                            "-"
                          ) : (
                            <Badge
                              color={
                                detailTagihan.payment_status === "1"
                                  ? "danger"
                                  : detailTagihan.payment_status === "2"
                                  ? "warning"
                                  : detailTagihan.payment_status === "3" &&
                                    "success"
                              }
                              className="p-2"
                            >
                              {detailTagihan.payment_status === "1" &&
                                "Belum Bayar"}
                              {detailTagihan.payment_status === "2" &&
                                "Menunggu Konfirmasi"}
                              {detailTagihan.payment_status === "3" &&
                                "Pembayaran Telah Selesai"}
                            </Badge>
                          )}
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">
                        Ringkasan Tagihan
                      </h3>
                    </div>

                    <Alert
                      isOpen={alert.isOpen}
                      title={alert.title}
                      message={alert.message}
                      color={alert.color}
                      toggle={handleCloseAlert}
                    />

                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th className="text-center">No.</th>
                            <th className="text-center">Tanggal Transaksi</th>
                            <th className="text-center">Produk</th>
                            <th className="text-center">Qty</th>
                            <th className="text-center">Harga Potongan</th>
                            <th className="text-end">Jumlah</th>
                          </tr>
                        </thead>

                        <tbody>
                          {detailTagihan.transaction.map((d, i) => (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">
                                {moment(d.transaction_date).format(
                                  "Do MMMM YYYY H:mm:ss"
                                )}
                              </td>
                              <td className="text-center">{d.product.name}</td>
                              <td className="text-center">{d.qty}</td>
                              <td className="text-center">
                                Rp {ConvertToRupiah(d.potonganHarga)}
                              </td>
                              <td className="text-end">
                                Rp {ConvertToRupiah(d.jumlah)}
                              </td>
                            </tr>
                          ))}
                          {/* <tr>
                        <td colSpan="2" className="text-end">
                          Sub Total
                        </td>
                        <td className="text-end">20</td>
                      </tr> */}
                          {detailTagihan?.total && (
                            <tr>
                              <td colSpan="5" className="border-0 text-end">
                                <strong>Total Pembayaran</strong>
                              </td>
                              <td className="border-0 text-end">
                                <h4 className="m-0">
                                  Rp {ConvertToRupiah(detailTagihan.total)}
                                </h4>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>

                    {!isLoading && !detailTagihan.transaction.length > 0 && (
                      <div className="d-flex justify-content-center pt-5 pb-5 text-danger">
                        Data Not Found
                      </div>
                    )}

                    <div className="d-print-none">
                      <div className="float-end">
                        {/* <Link
                            to="#"
                            onClick={printInvoice}
                            className="btn btn-success  me-2"
                          >
                            <i className="fa fa-print" />
                          </Link> */}
                        <Link
                          to="/tagihan"
                          className={`btn btn-warning w-md ${
                            detailTagihan.payment_status === "1" && "me-2"
                          }`}
                        >
                          Kembali
                        </Link>
                        {detailTagihan.payment_status === "1" && (
                          <Button
                            color="primary"
                            onClick={handleClickPayment}
                            disabled={isDisabledButton}
                            className="w-md "
                          >
                            Bayar
                          </Button>
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Detail.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Detail;
