import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  Form,
  Label,
  Row,
  Col,
  Input,
  Button,
  Spinner,
  Table,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import Breadcrumbs from "./../../components/Common/Breadcrumb";
import Modal from "./../../components/Modal";
import ModalMessage from "./../../components/Modal/ModalMessage";
import Alert from "./../../components/Alert";
import { MetaTags } from "react-meta-tags";

import {
  ApiDetailListTransaction,
  ApiUpdateDueDateTransaction,
  ApiAddTransactionDueDate,
  ApiUpdateStatusTransactionDueDate,
} from "../../api/transaction";

import moment from "../../lib/moment";
import { ReplaceToStartUpperCase, ReplaceDot } from "../../utils/replace";
import { ConvertToRupiah } from "../../utils/convert";
import { RegexAllowNumberWithDot } from "../../utils/regex";

const DetailTransaction = props => {
  const transactionCode = props.match.params.code;
  const [dataDetail, setDataDetail] = useState({});
  const [dataTempo, setDataTempo] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isDisabledButtonModal, setIsDisabledButtonModal] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
  });
  const [modalAddTempo, setModalAddTempo] = useState({
    isOpen: false,
    title: "",
  });
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    message: "",
    params: "",
  });
  const [formEditModal, setFormEditModal] = useState({});
  const [formAddModal, setFormAddModal] = useState({});
  const [isShowAddButtonTempo, setIsShowAddButtonTempo] = useState(false);
  const [isDisabledButtonTransactionDone, setIsDisabledButtonTransactionDone] =
    useState(true);

  useEffect(() => {
    setIsLoadingData(true);
    ApiDetailListTransaction(transactionCode).then(response => {
      if (response) {
        setDataDetail(response.result);
        if (response.result.transaction_type === "tempo") {
          setDataTempo(response.result.dueDate);
        }
        setIsLoadingData(false);
        console.log("response", response);
      }
    });
  }, [transactionCode]);

  useEffect(() => {
    if (dataTempo.length > 0) {
      const filterTempo = dataTempo.filter(
        d => d.description === null && d.paid === null
      );
      if (filterTempo.length > 0 || dataDetail.bill_total === 0) {
        setIsShowAddButtonTempo(false);
      } else {
        setIsShowAddButtonTempo(true);
      }

      if (dataDetail.bill_total !== 0 || dataDetail.bill_total === null) {
        setIsDisabledButtonTransactionDone(true);
      } else {
        setIsDisabledButtonTransactionDone(false);
      }
    }
  }, [dataTempo, dataDetail]);

  const handleShowModalEditTempo = useCallback(
    id => {
      const findTempo = dataTempo.find(d => d.transaction_due_date_id === id);
      setFormEditModal({
        description: {
          value: "",
          error: "",
        },
        diBayar: {
          value: "",
          error: "",
        },
        endDate: findTempo.end_date,
        startDate: findTempo.start_date,
        status_transaction_due_date: findTempo.status_transaction_due_date,
        tempo: findTempo.tempo,
        dueDateid: findTempo.transaction_due_date_id,
        transactionId: findTempo.transaction_id_transaction_due_date,
      });
      setModal(oldState => ({
        ...oldState,
        isOpen: true,
        title: `Edit Tempo  ${findTempo.tempo}`,
      }));
    },
    [dataTempo]
  );

  const handleCloseModalEditTempo = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
    }));
    setFormEditModal({});
  }, []);

  const handleChangeInputEditModalTempo = useCallback(e => {
    let { name, value } = e.target;

    if (name === "description") {
      setFormEditModal(oldState => ({
        ...oldState,
        description: {
          ...oldState.description,
          value: value,
          error: "",
        },
      }));
    } else if (name === "dibayar") {
      if (value) {
        const regex = new RegExp(RegexAllowNumberWithDot);
        if (!regex.test(value)) return false;
        const replaceDot = ReplaceDot(value);
        value = ConvertToRupiah(replaceDot);
      } else {
        value = "";
      }
      setFormEditModal(oldState => ({
        ...oldState,
        diBayar: {
          ...oldState.diBayar,
          value: value,
          error: "",
        },
      }));
    }
  }, []);

  const handleSubmitEditTempo = useCallback(() => {
    const description = formEditModal.description;
    const diBayarkan = formEditModal.diBayar;
    if (description.value === "") {
      setFormEditModal(oldState => ({
        ...oldState,
        description: {
          ...oldState.description,
          error: "Pleasa enter this value",
        },
      }));
    } else if (diBayarkan.value === "") {
      setFormEditModal(oldState => ({
        ...oldState,
        diBayar: {
          ...oldState.diBayar,
          error: "Pleasa enter this value",
        },
      }));
    } else if (Number(ReplaceDot(diBayarkan.value)) > dataDetail.bill_total) {
      setFormEditModal(oldState => ({
        ...oldState,
        diBayar: {
          ...oldState.diBayar,
          error: `max paid Rp${ConvertToRupiah(dataDetail.bill_total)}`,
        },
      }));
    } else {
      const dueDateId = formEditModal.dueDateid;
      setIsDisabledButtonModal(true);
      const payload = {
        type: "tempo",
        description: description.value,
        paid: Number(ReplaceDot(diBayarkan.value)),
      };
      ApiUpdateDueDateTransaction(dueDateId, payload).then(response => {
        if (response) {
          if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Updated Tempo Successfully",
              params: "success",
            });
            setIsDisabledButtonModal(false);
            setDataDetail(oldState => ({
              ...oldState,
              paid_total: response.result.sumTotalPaid,
              bill_total: response.result.sumTotalBill,
            }));
            const findIndex = dataTempo
              .map(d => d.transaction_due_date_id)
              .indexOf(dueDateId);
            const state = [...dataTempo];
            state[findIndex].description = description.value;
            state[findIndex].paid = Number(ReplaceDot(diBayarkan.value));
            setDataTempo(state);
            handleCloseModalEditTempo();
          }
        }
      });
    }
  }, [dataDetail, dataTempo, formEditModal, handleCloseModalEditTempo]);

  const handleShowModalAddTempo = useCallback(() => {
    setFormAddModal({
      description: null,
      paid: null,
      startDate: {
        value: "",
        error: "",
      },
      endDate: {
        value: "",
        error: "",
      },
      statusDueDate: "0",
    });
    setModalAddTempo(oldState => ({
      ...oldState,
      isOpen: true,
      title: `Tambah Tempo`,
    }));
  }, []);

  const handleCloseModalAddTempo = useCallback(() => {
    setModalAddTempo(oldState => ({
      ...oldState,
      isOpen: false,
      title: ``,
    }));
    setFormAddModal({});
  }, []);

  const handleChangeWaktuTempo = useCallback(e => {
    const { name, value } = e.target;

    if (name === "startDate") {
      setFormAddModal(oldState => ({
        ...oldState,
        startDate: {
          ...oldState.startDate,
          value: value,
          error: "",
        },
      }));
    } else if (name === "endDate") {
      setFormAddModal(oldState => ({
        ...oldState,
        endDate: {
          ...oldState.endDate,
          value: value,
          error: "",
        },
      }));
    }
  }, []);

  const handleSubmitAddTempo = useCallback(() => {
    const startDateValue = formAddModal.startDate.value;
    const endDateValue = formAddModal.endDate.value;
    if (startDateValue === "") {
      setFormAddModal(oldState => ({
        ...oldState,
        startDate: {
          ...oldState.startDate,
          error: "Pleasa enter this value",
        },
      }));
    } else if (endDateValue === "") {
      setFormAddModal(oldState => ({
        ...oldState,
        endDate: {
          ...oldState.endDate,
          error: "Pleasa enter this value",
        },
      }));
    } else {
      setIsDisabledButtonModal(true);
      const payload = {
        type: "tempo",
        transactionId: dataDetail.transaction_id,
        startDate: startDateValue,
        endDate: endDateValue,
      };
      ApiAddTransactionDueDate(payload).then(response => {
        if (response) {
          if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Added Tempo Successfully",
              params: "success",
            });
            setDataTempo(oldState => [...oldState, response.result]);
            handleCloseModalAddTempo();
          }
        }
      });
    }
  }, [dataDetail, formAddModal, handleCloseModalAddTempo]);

  const handleSubmitTransactionDone = useCallback(() => {
    setIsDisabledButtonTransactionDone(true);
    const payload = {
      status: "1",
    };
    ApiUpdateStatusTransactionDueDate(dataDetail.transaction_id, payload).then(
      response => {
        if (response) {
          if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Transaction Was Successful",
              params: "success",
            });
            setDataDetail(oldState => ({
              ...oldState,
              transactionStatus: response.result.status,
            }));
            setIsDisabledButtonTransactionDone(false);
          }
        }
      }
    );
  }, [dataDetail]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Detail Transaksi</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Detail" breadcrumbItem="Transaksi" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                {isLoadingData && (
                  <div className="d-flex justify-content-center pt-5 pb-5 text-primary">
                    <Spinner />
                  </div>
                )}

                {!isLoadingData && (
                  <Fragment>
                    <Col md="12" className="mb-3">
                      <div className="d-flex align-items-center">
                        {/* <div style={{ marginRight: 5 }}>
                      <i className="fa fa-users"></i>
                    </div> */}

                        <div>
                          <h4 className="m-0 font-size-18">Detail Transaksi</h4>
                        </div>
                      </div>
                      <Row>
                        <Col md="12">
                          <Row className="mt-2">
                            <div className="col-3 col-md-2">Kode</div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.code}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">
                              Jenis Transaksi
                            </div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.transaction_type === "cash" && (
                                <span
                                  className={`badge badge-soft-primary font-size-12 p-1`}
                                >
                                  CASH
                                </span>
                              )}
                              {dataDetail.transaction_type === "titip" && (
                                <span
                                  className={`badge badge-soft-info font-size-12 p-1`}
                                >
                                  TITIP
                                </span>
                              )}
                              {dataDetail.transaction_type === "tempo" && (
                                <span
                                  className={`badge badge-soft-warning font-size-12 p-1`}
                                >
                                  TEMPO
                                </span>
                              )}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-3 col-md-2">Nama</div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.consumer.name}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">Tipe Konsumen</div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.consumer_type}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">No.Tlp</div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.consumer.no_tlp}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">Alamat Lengkap</div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.consumer.address},{" "}
                              {ReplaceToStartUpperCase(
                                dataDetail.consumer.kabupaten.replace(
                                  /KAB./g,
                                  ""
                                )
                              )}
                              ,{" "}
                              {ReplaceToStartUpperCase(
                                dataDetail.consumer.provinsi
                              )}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">
                              Waktu Transaksi
                            </div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {moment(dataDetail.date_transaction).format(
                                "Do MMMM YYYY"
                              )}{" "}
                              Pkl{" "}
                              {moment(dataDetail.date_transaction).format(
                                "H:mm:ss"
                              )}
                            </div>
                          </Row>
                          <Row className="mt-2">
                            <div className="col-5 col-md-2">
                              Status Transaksi
                            </div>
                            <div className="col-auto col-md-auto d-none d-sm-block">
                              :
                            </div>
                            <div className="col-12 col-md-auto text-muted">
                              {dataDetail.transactionStatus === "0" && (
                                <span
                                  className={`badge badge-soft-danger font-size-12 p-1`}
                                >
                                  Belum Selesai
                                </span>
                              )}

                              {dataDetail.transactionStatus === "1" && (
                                <span
                                  className={`badge badge-soft-success font-size-12 p-1`}
                                >
                                  Sudah Selesai
                                </span>
                              )}
                            </div>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                    <Col md="12" className="mt-4">
                      <div className="d-flex align-items-center">
                        {/* <div style={{ marginRight: 5 }}>
                      <i className="fa fa-users"></i>
                    </div> */}

                        <div>
                          <h4 className="m-0 font-size-18">Ringkasan Produk</h4>
                        </div>
                      </div>
                      <Row className="mt-2">
                        <div className="table-responsive">
                          <Table className="table-nowrap">
                            <thead>
                              <tr>
                                <th className="text-center">Produk</th>
                                <th className="text-center">Berat</th>
                                <th className="text-center">Harga Produk</th>
                                <th className="text-center">Diskon</th>
                                <th className="text-center">Qty</th>
                                <th className="text-center">Harga Jual</th>
                                <th className="text-end">Total</th>
                              </tr>
                            </thead>

                            <tbody>
                              {dataDetail.product.map((d, i) => (
                                <tr key={i}>
                                  <td className="text-center">{d.name}</td>
                                  <td className="text-center">{d.weight}</td>
                                  <td className="text-center">
                                    Rp{ConvertToRupiah(d.productPrice)}
                                  </td>
                                  <td className="text-center">{d.discount}%</td>
                                  <td className="text-center">{d.qty}</td>
                                  <td className="text-center">
                                    Rp{ConvertToRupiah(d.sellPrice)}
                                  </td>
                                  <td className="text-end">
                                    Rp{ConvertToRupiah(d.totalPrice)}
                                  </td>
                                </tr>
                              ))}
                              <tr className="m-0">
                                <td colSpan="6" className="text-end">
                                  <strong>Subtotal</strong>
                                </td>
                                <td className="text-end">
                                  <h4 className="m-0">
                                    Rp{ConvertToRupiah(dataDetail.subtotal)}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Row>
                    </Col>

                    {dataDetail.transaction_type === "tempo" && (
                      <Col md="12" className="mt-4">
                        <div className="d-flex align-items-center">
                          {/* <div style={{ marginRight: 5 }}>
                            <i className="fa fa-users"></i>
                          </div> */}

                          <div>
                            <h4 className="m-0 font-size-18">Riwayat Tempo</h4>
                          </div>
                        </div>
                        <Row className="mt-2">
                          <div className="table-responsive">
                            <Table className="table-nowrap">
                              <thead>
                                <tr>
                                  <th className="text-center">Keterangan</th>
                                  <th className="text-center">Waktu Tempo</th>
                                  <th className="text-center">Status Tempo</th>
                                  <th className="text-center">Deskripsi</th>
                                  <th className="text-center">Dibayar</th>
                                  <th className="text-center">Action</th>
                                  {/* <th className="text-center">Qty</th>
                                  <th className="text-center">Harga</th>
                                  <th className="text-end">Total</th> */}
                                </tr>
                              </thead>

                              <tbody>
                                {dataTempo.map((d, i) => (
                                  <tr key={i}>
                                    <td className="text-center">
                                      Tempo {d.tempo}
                                    </td>
                                    <td className="text-center">
                                      {moment(d.start_date).format(
                                        "Do MMMM YYYY"
                                      )}{" "}
                                      s.d.{" "}
                                      {moment(d.end_date).format(
                                        "Do MMMM YYYY"
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {d.status_transaction_due_date ===
                                        "0" && (
                                        <span
                                          className={`badge badge-soft-warning font-size-12 p-1`}
                                        >
                                          Sedang Berlangsung
                                        </span>
                                      )}

                                      {d.status_transaction_due_date ===
                                        "1" && (
                                        <span
                                          className={`badge badge-soft-danger font-size-12 p-1`}
                                        >
                                          Lewat Waktu Tempo
                                        </span>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      {d.description === null
                                        ? "-"
                                        : d.description}
                                    </td>
                                    <td className="text-center">
                                      {d.paid === null
                                        ? "-"
                                        : d.paid === 0
                                        ? "Rp0"
                                        : `Rp${ConvertToRupiah(d.paid)}`}
                                    </td>
                                    <td className="text-center">
                                      {d.status_transaction_due_date === "1" &&
                                      d.description === null ? (
                                        <Link
                                          to="#"
                                          className="text-warning"
                                          onClick={() =>
                                            handleShowModalEditTempo(
                                              d.transaction_due_date_id
                                            )
                                          }
                                        >
                                          Edit
                                        </Link>
                                      ) : (
                                        "-"
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>

                          {isShowAddButtonTempo && (
                            <Col md="12" style={{ marginTop: 5 }}>
                              <Button
                                size="sm"
                                color="primary"
                                onClick={handleShowModalAddTempo}
                              >
                                <i className="fas fa-plus" /> Tambah Tempo
                              </Button>
                            </Col>
                          )}
                        </Row>
                      </Col>
                    )}

                    <Col md="12" className="mt-4">
                      {/* <div className="d-flex align-items-center">
                        <div style={{ marginRight: 5 }}>
                          <i className="fa fa-users"></i>
                        </div>

                        <div>
                          <h4 className="m-0 font-size-18">
                            Detail Pembayaran
                          </h4>
                        </div>
                      </div> */}
                      <Row className="mt-2">
                        <div className="col-12 col-md-12">
                          <div className="offset-md-6 offset-12 badge-soft-primary p-1">
                            {dataDetail.transaction_type === "tempo" && (
                              <Fragment>
                                <Row>
                                  <div className="col-6 col-md-6">
                                    <h4 className="font-size-16 m-0 p-1 text-primary">
                                      Total Bayar
                                    </h4>
                                  </div>
                                  <div className="col-6 col-md-6 text-end">
                                    <h4 className="font-size-16 m-0 p-1 text-primary">
                                      Rp
                                      {dataDetail.paid_total === null ||
                                      dataDetail.paid_total === 0
                                        ? "0"
                                        : ConvertToRupiah(
                                            dataDetail.paid_total
                                          )}
                                    </h4>
                                  </div>
                                </Row>
                                <Row>
                                  <div className="col-6 col-md-6">
                                    <h4 className="font-size-16 m-0 p-1 text-primary">
                                      Sisa Tagihan
                                    </h4>
                                  </div>
                                  <div className="col-6 col-md-6 text-end">
                                    <h4 className="font-size-16 m-0 p-1 text-primary">
                                      Rp
                                      {dataDetail.bill_total === null ||
                                      dataDetail.bill_total === 0
                                        ? "0"
                                        : ConvertToRupiah(
                                            dataDetail.bill_total
                                          )}
                                    </h4>
                                  </div>
                                </Row>
                              </Fragment>
                            )}

                            <Row>
                              <div className="col-6 col-md-6">
                                <h4 className="font-size-16 m-0 p-1 text-primary">
                                  Total Pembayaran
                                </h4>
                              </div>
                              <div className="col-6 col-md-6 text-end">
                                <h4 className="font-size-16 m-0 p-1 text-primary">
                                  Rp{ConvertToRupiah(dataDetail.subtotal)}
                                </h4>
                              </div>
                            </Row>
                          </div>
                        </div>
                      </Row>
                    </Col>

                    <Col className="col-12 mt-4">
                      <div className="d-flex justify-content-end">
                        <Link
                          to="/transaction"
                          className="btn btn-danger mb-2 me-2"
                        >
                          Kembali
                        </Link>

                        {dataDetail.transaction_type === "tempo" &&
                          dataDetail.transactionStatus === "0" && (
                            <Button
                              type="button"
                              color="primary"
                              className="mb-2"
                              onClick={handleSubmitTransactionDone}
                              disabled={isDisabledButtonTransactionDone}
                            >
                              Transaksi Selesai
                            </Button>
                          )}
                      </div>
                    </Col>
                  </Fragment>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          title={modal.title}
          onClose={handleCloseModalEditTempo}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitEditTempo}
          isDisabledButtonLeft={isDisabledButtonModal}
          isDisabledButtonRight={isDisabledButtonModal}
        >
          <Form>
            <div className="mb-3 ">
              <Label htmlFor="formrow-firstname-Input">Deskripsi</Label>
              <Input
                value={formEditModal.description.value}
                type="textarea"
                name="description"
                className="form-control"
                onChange={handleChangeInputEditModalTempo}
                placeholder="Enter description"
              />
              {formEditModal.description.error && (
                <p className="text-danger">{formEditModal.description.error}</p>
              )}
            </div>

            <div className="mb-3 ">
              <Label htmlFor="formrow-firstname-Input">Dibayar</Label>
              <InputGroup>
                <InputGroupText>Rp</InputGroupText>
                <Input
                  value={formEditModal.diBayar.value}
                  name="dibayar"
                  type="text"
                  className="form-control"
                  onChange={handleChangeInputEditModalTempo}
                />
              </InputGroup>
              {formEditModal.diBayar.error && (
                <p className="text-danger">{formEditModal.diBayar.error}</p>
              )}
            </div>
          </Form>
        </Modal>
      )}

      {modalAddTempo.isOpen && (
        <Modal
          isOpen={modalAddTempo.isOpen}
          title={modalAddTempo.title}
          onClose={handleCloseModalAddTempo}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitAddTempo}
          isDisabledButtonLeft={isDisabledButtonModal}
          isDisabledButtonRight={isDisabledButtonModal}
        >
          <Form>
            <div className="mb-3 ">
              <Label htmlFor="formrow-firstname-Input">Waktu Tempo</Label>

              <Row>
                <Col className="col-12 col-md-5 mb-2">
                  <p className="p-0 m-0 mb-1 text-secondary">Tanggal Awal</p>
                  <Input
                    type="date"
                    name="startDate"
                    value={formAddModal.startDate.value}
                    onChange={handleChangeWaktuTempo}
                  />
                  {formAddModal.startDate.error && (
                    <p className="text-danger">
                      {formAddModal.startDate.error}
                    </p>
                  )}
                </Col>
                <Col className="col-12 col-md-2 mb-2 text-center">
                  <p className="p-0 mb-0 mt-md-4 mt-lg-4">s.d.</p>
                </Col>
                <Col className="col-12 col-md-5 mb-2">
                  <p className="p-0 m-0 mb-1 text-secondary">Tanggal Akhir</p>
                  <Input
                    type="date"
                    name="endDate"
                    value={formAddModal.endDate.value}
                    onChange={handleChangeWaktuTempo}
                  />
                  {formAddModal.endDate.error && (
                    <p className="text-danger">{formAddModal.endDate.error}</p>
                  )}
                </Col>
              </Row>
            </div>
          </Form>
        </Modal>
      )}

      <ModalMessage
        isOpen={modalMessage.isOpen}
        params={modalMessage.params}
        message={modalMessage.message}
        onClose={() => {
          setModalMessage({
            isOpen: false,
            message: "",
            params: "",
          });
        }}
      />
    </div>
  );
};

DetailTransaction.propTypes = {
  match: PropTypes.object,
};

export default DetailTransaction;
