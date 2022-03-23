import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
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
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Modal from "../../components/Modal";
import ModalMessage from "../../components/Modal/ModalMessage";
import Toast from "../../components/Toast";
import ModalLoading from "../../components/Modal/ModalLoading";
import Alert from "../../components/Alert";
import { MetaTags } from "react-meta-tags";
import TableComponents from "../../components/Table";

import {
  ApiDetailListTransaction,
  ApiUpdateTempoTransaction,
  ApiAddTransactionDueDate,
  ApiUpdateStatusTransactionDueDate,
  ApiAddTransactionTitipDetail,
  ApiGetTransactionTempoDetail,
  ApiGetTransactionTitipDetail,
} from "../../api/transaction";

import {
  ApiGenerateInvoiceTempoTransaction,
  ApiGenerateInvoiceTitipTransaction,
} from "../../api/file";

import moment from "../../lib/moment";
import { ReplaceToStartUpperCase, ReplaceDot } from "../../utils/replace";
import { ConvertToRupiah } from "../../utils/convert";
import { RegexAllowNumberWithDot } from "../../utils/regex";
import DownloadFile from "../../helpers/DownloadFile";
import { URL_API_IMAGES } from "../../config/url";

const DetailTransaction = props => {
  const transactionCode = props.match.params.code;
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const [dataDetail, setDataDetail] = useState({});
  const [dataDueDate, setDataDueDate] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
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
  const [modalEditTitip, setModalEditTitip] = useState({
    isOpen: false,
    title: "",
  });
  const [listInputEditTitip, setListInputEditTitip] = useState([]);
  const [subTotalTitipPrice, setSubtotalTitipPrice] = useState(0);
  const [idDueDate, setIdDueDate] = useState(0);
  const [isShowAddButtonDueDate, setIsShowAddButtonDueDate] = useState(false);
  const [isDisabledButtonTransactionDone, setIsDisabledButtonTransactionDone] =
    useState(true);

  const [userCoordinate, setUserCoordinate] = useState({
    latitude: "",
    longitude: "",
  });

  const [toast, setToast] = useState({
    isOpen: false,
    title: "",
    message: "",
    bgColor: "",
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("geolocation");
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Available");
        setUserCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Not Available");
    }
  }, []);

  useEffect(() => {
    setIsLoadingData(true);
    ApiDetailListTransaction(transactionCode).then(response => {
      if (response) {
        setDataDetail(response.result);
        if (response.result.transaction_type === "tempo") {
          setDataDueDate(response.result.dueDate);
        } else if (response.result.transaction_type === "titip") {
          let resultDueDate = response.result.dueDate;
          for (let i = 0; i < resultDueDate.length; i++) {
            if (resultDueDate[i].product.length > 0) {
              const arrProductList = [];
              for (let j = 0; j < resultDueDate[i].product.length; j++) {
                arrProductList.push({
                  name: resultDueDate[i].product[j].name,
                  sellPrice: `Rp${ConvertToRupiah(
                    resultDueDate[i].product[j].sell_price
                  )}`,
                  totalLeft: resultDueDate[i].product[j].total_left,
                  totalSell: resultDueDate[i].product[j].total_sell,
                  total:
                    resultDueDate[i].product[j].total_price === 0
                      ? "Rp0"
                      : `Rp${ConvertToRupiah(
                          resultDueDate[i].product[j].total_price
                        )}`,
                });
              }
              resultDueDate[i].product = arrProductList;
            }
          }
          setDataDueDate(response.result.dueDate);
        }
        setIsLoadingData(false);
      }
    });
  }, [transactionCode]);

  useEffect(() => {
    if (dataDetail.transaction_type === "tempo") {
      if (dataDueDate.length > 0) {
        const filterTempo = dataDueDate.filter(
          d => d.description === null && d.paidPrice === null
        );
        if (filterTempo.length > 0 || dataDetail.total_bill_price === 0) {
          setIsShowAddButtonDueDate(false);
        } else {
          setIsShowAddButtonDueDate(true);
        }

        if (
          dataDetail.total_bill_price !== 0 ||
          dataDetail.total_bill_price === null
        ) {
          setIsDisabledButtonTransactionDone(true);
        } else {
          setIsDisabledButtonTransactionDone(false);
        }
      }
    } else if (dataDetail.transaction_type === "titip") {
      if (dataDueDate.length > 0) {
        const dueDateStatusDua = dataDueDate.filter(
          d => d.status_transaction_due_date === "2"
        );
        const dueDateStatusKosong = dataDueDate.filter(
          d => d.status_transaction_due_date === "0"
        );
        const dueDateStatusSatu = dataDueDate.filter(
          d => d.status_transaction_due_date === "1"
        );
        if (
          dueDateStatusDua.length > 0 &&
          !dueDateStatusKosong.length &&
          !dueDateStatusSatu.length &&
          dataDetail.total_paid_price !== dataDetail.subtotal_price
        ) {
          setIsShowAddButtonDueDate(true);
        } else {
          setIsShowAddButtonDueDate(false);
        }
      }
      setIsDisabledButtonTransactionDone(false);
    }
  }, [dataDueDate, dataDetail]);

  const handleShowModalEditTempo = useCallback(
    id => {
      const findTempo = dataDueDate.find(d => d.transaction_due_date_id === id);
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
        tempoDetailId: findTempo.tempoDetailId,
        transactionId: findTempo.transaction_id_transaction_due_date,
      });
      setModal(oldState => ({
        ...oldState,
        isOpen: true,
        title: `Edit Tempo  ${findTempo.tempo}`,
      }));
    },
    [dataDueDate]
  );

  const handleCloseModalEditTempo = useCallback(() => {
    setModal(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
    }));
    setFormEditModal({});
    // setAlert(oldState => ({
    //   ...oldState,
    //   isOpen: false,
    //   title: "",
    //   color: "",
    //   message: ``,
    // }));
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
    if (userCoordinate.latitude === "" && userCoordinate.longitude === "") {
      setToast(oldState => ({
        ...oldState,
        isOpen: true,
        title: "Location",
        message: `Silahkan cek izin akses lokasi anda`,
        bgColor: "danger",
      }));
    } else if (description.value === "") {
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
    } else if (
      Number(ReplaceDot(diBayarkan.value)) > dataDetail.total_bill_price
    ) {
      setFormEditModal(oldState => ({
        ...oldState,
        diBayar: {
          ...oldState.diBayar,
          error: `max paid Rp${ConvertToRupiah(dataDetail.total_bill_price)}`,
        },
      }));
    } else {
      const tempoDetailId = formEditModal.tempoDetailId;
      setIsDisabledButtonModal(true);
      const payload = {
        description: description.value,
        paid: Number(ReplaceDot(diBayarkan.value)),
        dueDateStatus: "2",
        coordinate: userCoordinate,
      };
      ApiUpdateTempoTransaction(tempoDetailId, payload).then(response => {
        if (response) {
          if (response.status === 400) {
            if (response.result.name === "paid") {
              setFormEditModal(oldState => ({
                ...oldState,
                diBayar: {
                  ...oldState.diBayar,
                  error: response.message,
                },
              }));
            } else if (response.result.name === "distance") {
              // setAlert(oldState => ({
              //   ...oldState,
              //   isOpen: true,
              //   title: "Location",
              //   color: "danger",
              //   message: `Please check your location. ${response.message}`,
              // }));
              setToast(oldState => ({
                ...oldState,
                isOpen: true,
                title: "Location",
                message: `Please check your location. ${response.message}`,
                bgColor: "danger",
              }));
            }
          } else if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Updated Tempo Successfully",
              params: "success",
            });
            setDataDetail(oldState => ({
              ...oldState,
              total_paid_price: response.result.sumTotalPaid,
              total_bill_price: response.result.sumTotalBill,
            }));
            const findIndex = dataDueDate
              .map(d => d.tempoDetailId)
              .indexOf(tempoDetailId);
            const state = [...dataDueDate];
            state[findIndex].description = description.value;
            state[findIndex].paidPrice = Number(ReplaceDot(diBayarkan.value));
            state[findIndex].status_transaction_due_date =
              response.result.dueDateStatus;
            state[findIndex].created_at = response.result.dateTime;
            setDataDueDate(state);
            handleCloseModalEditTempo();
          }
          setIsDisabledButtonModal(false);
        }
      });
    }
  }, [
    dataDetail,
    dataDueDate,
    formEditModal,
    handleCloseModalEditTempo,
    userCoordinate,
  ]);

  const handleShowModalAddDueDate = useCallback(() => {
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
      title: `Tambah Waktu ${
        dataDetail.transaction_type === "titip" ? "Titip" : " Tempo"
      }`,
    }));
  }, [dataDetail]);

  const handleCloseModalAddTempo = useCallback(() => {
    setModalAddTempo(oldState => ({
      ...oldState,
      isOpen: false,
      title: ``,
    }));
    setFormAddModal({});
    // setAlert(oldState => ({
    //   ...oldState,
    //   isOpen: false,
    //   title: "",
    //   color: "",
    //   message: ``,
    // }));
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

  const handleSubmitAddDueDate = useCallback(() => {
    const transactionType = dataDetail.transaction_type;
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
        type: transactionType === "tempo" ? "tempo" : "titip",
        transactionId: dataDetail.transaction_id,
        startDate: startDateValue,
        endDate: endDateValue,
      };
      ApiAddTransactionDueDate(payload).then(response => {
        if (response) {
          if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Added Due Date Successfully",
              params: "success",
            });
            setDataDueDate(oldState => [...oldState, response.result]);
            handleCloseModalAddTempo();
            setIsDisabledButtonModal(false);
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

  const handleShowModalEditTitip = useCallback(
    index => {
      setModalEditTitip({
        isOpen: true,
        title: "Edit Titip",
      });
      setIdDueDate(dataDueDate[index].transaction_due_date_id);

      let dataProduct = [];
      if (dataDueDate.length === 1) {
        dataProduct = dataDetail.product;
      } else {
        const list = dataDueDate[dataDueDate.length - 2].product;
        const arrList = [];
        for (let i = 0; i < list.length; i++) {
          arrList.push({
            name: list[i].name,
            total: list[i].total,
            totalLeft: list[i].totalLeft,
            totalSell: list[i].totalSell,
            sellPrice: Number(ReplaceDot(list[i].sellPrice.replace(/Rp/g, ""))),
          });
        }
        dataProduct = arrList;
      }

      const arrList = [];
      const filterDataProduct = dataProduct.filter(d => {
        if (d.totalLeft > 0) {
          return d;
        } else if (d.totalLeft === null) {
          return d;
        }
      });
      for (let i = 0; i < filterDataProduct.length; i++) {
        const filterProduct = dataDetail.product.filter(d => d.totalLeft !== 0);
        arrList.push({
          transactionDetailProductId: filterProduct[i].transactionDetailId,
          name: filterDataProduct[i].name,
          qty: filterDataProduct[i].qty || filterDataProduct[i].totalLeft,
          sellPrice: filterDataProduct[i].sellPrice,
          totalSell: {
            value: "",
            error: "",
          },
          totalLeft: filterDataProduct[i].qty || filterDataProduct[i].totalLeft,
          total: 0,
        });
      }
      setListInputEditTitip(arrList);
    },
    [dataDueDate, dataDetail]
  );

  const handleCloseModalEditTitip = useCallback(() => {
    setModalEditTitip({
      isOpen: false,
      title: "",
    });
    setListInputEditTitip([]);
    setSubtotalTitipPrice(0);
    setIdDueDate(0);
    // setAlert(oldState => ({
    //   ...oldState,
    //   isOpen: false,
    //   title: "",
    //   color: "",
    //   message: ``,
    // }));
  }, [dataDueDate]);

  const handleChangeInputEditTitip = useCallback(
    (e, index) => {
      let { name, value } = e.target;
      let state = [...listInputEditTitip];

      if (isNaN(value)) return false;

      value = Number(value);

      if (name === "totalSell") {
        if (value > state[index].qty) return false;
        const totalQty = state[index].qty - value;
        const totalPrice = state[index].sellPrice * value;
        state[index].totalSell = {
          ...state[index].totalSell,
          value: value,
          error: "",
        };
        state[index].totalLeft = totalQty;
        state[index].total = totalPrice;

        const subTotal = listInputEditTitip.reduce((a, b) => {
          return a + b.total;
        }, 0);

        setSubtotalTitipPrice(subTotal);
      }

      setListInputEditTitip(state);
    },
    [listInputEditTitip]
  );

  const handleSubmitEditTitip = useCallback(() => {
    const indexTotalSell = listInputEditTitip.findIndex(
      d => d.totalSell.value === ""
    );
    if (userCoordinate.latitude === "" && userCoordinate.longitude === "") {
      setToast(oldState => ({
        ...oldState,
        isOpen: true,
        title: "Location",
        message: `Silahkan cek izin akses lokasi anda`,
        bgColor: "danger",
      }));
    } else if (indexTotalSell >= 0) {
      const state = [...listInputEditTitip];
      state[indexTotalSell].totalSell.error = "Total is Required";
      setListInputEditTitip(state);
      return false;
    } else {
      setIsDisabledButtonModal(true);
      const arrListSell = [];
      const arrListDueDateProduct = [];
      for (let i = 0; i < listInputEditTitip.length; i++) {
        arrListSell.push({
          transactionDetailProductId:
            listInputEditTitip[i].transactionDetailProductId,
          totalSell: listInputEditTitip[i].totalSell.value,
        });

        arrListDueDateProduct.push({
          name: listInputEditTitip[i].name,
          sellPrice: `Rp${ConvertToRupiah(listInputEditTitip[i].sellPrice)}`,
          totalLeft: listInputEditTitip[i].totalLeft,
          totalSell: listInputEditTitip[i].totalSell.value,
          total: `Rp${ConvertToRupiah(listInputEditTitip[i].total)}`,
        });
      }
      const payload = {
        transactionId: dataDetail.transaction_id,
        dueDateId: idDueDate,
        listSell: arrListSell,
        coordinate: userCoordinate,
      };
      ApiAddTransactionTitipDetail(payload).then(response => {
        if (response) {
          if (response.status === 400) {
            if (response.result.name === "distance") {
              // setAlert(oldState => ({
              //   ...oldState,
              //   isOpen: true,
              //   title: "Location",
              //   color: "danger",
              //   message: `Please check your location. ${response.message}`,
              // }));
              setToast(oldState => ({
                ...oldState,
                isOpen: true,
                title: "Location",
                message: `Please check your location. ${response.message}`,
                bgColor: "danger",
              }));
            }
          } else if (response.status === 201) {
            setModalMessage({
              isOpen: true,
              message: "Updated Titip Successfully",
              params: "success",
            });
            const stateDueDate = [...dataDueDate];
            const indexDataDueDate = dataDueDate
              .map(d => d.transaction_due_date_id)
              .indexOf(idDueDate);
            stateDueDate[indexDataDueDate].product = arrListDueDateProduct;
            stateDueDate[indexDataDueDate].status_transaction_due_date = "2";
            stateDueDate[indexDataDueDate].visit_date =
              response.result.visitDate;
            setDataDueDate(stateDueDate);
            setDataDetail(oldState => ({
              ...oldState,
              total_paid_price: response.result.totalPaidPrice,
            }));
            handleCloseModalEditTitip();
          }
          setIsDisabledButtonModal(false);
        }
      });
    }
  }, [
    listInputEditTitip,
    dataDetail,
    idDueDate,
    dataDueDate,
    handleCloseModalEditTitip,
    userCoordinate,
  ]);

  const handleDownloadInvoiceTempo = useCallback(
    (dueDateId, tempoId) => {
      setIsModalLoading(true);
      const transactionId = dataDetail.transaction_id;
      ApiGetTransactionTempoDetail(transactionId, dueDateId, tempoId).then(
        response => {
          if (response) {
            if (response.status === 200) {
              const payload = {
                data: response.result.data,
              };
              ApiGenerateInvoiceTempoTransaction(payload).then(
                responseGenerate => {
                  if (responseGenerate.status === 201) {
                    const url = `${URL_API_IMAGES}/${responseGenerate.result.url}`;
                    DownloadFile(url, "application/pdf", "INVOICE TEMPO.pdf");
                    setIsModalLoading(false);
                    // window.open(`${responseGenerate.result.url}`);
                    // setIsModalLoading(false);
                    // if (window.focus) {
                    //   newwindow.focus();
                    // }
                  }
                }
              );
            }
          }
        }
      );
    },
    [dataDetail]
  );

  const handleDownloadInvoiceTitip = useCallback((transactionId, dueDateId) => {
    setIsModalLoading(true);
    ApiGetTransactionTitipDetail(transactionId, dueDateId).then(response => {
      if (response) {
        if (response.status === 200) {
          const payload = {
            data: response.result.data,
          };
          ApiGenerateInvoiceTitipTransaction(payload).then(responseGenerate => {
            if (responseGenerate.status === 201) {
              const url = `${URL_API_IMAGES}/${responseGenerate.result.url}`;
              DownloadFile(url, "application/pdf", "INVOICE TITIP.pdf");
              setIsModalLoading(false);
            }
          });
        }
      }
    });
  }, []);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Detail Transaksi | SAO Herbal</title>
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
                                    Rp
                                    {ConvertToRupiah(dataDetail.subtotal_price)}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Row>
                    </Col>

                    {(dataDetail.transaction_type === "tempo" ||
                      dataDetail.transaction_type === "titip") && (
                      <Col md="12" className="mt-4">
                        <div className="d-flex align-items-center">
                          {/* <div style={{ marginRight: 5 }}>
                            <i className="fa fa-users"></i>
                          </div> */}

                          <div>
                            <h4 className="m-0 font-size-18">
                              {dataDetail.transaction_type === "tempo" &&
                                "Riwayat Tempo"}
                              {dataDetail.transaction_type === "titip" &&
                                "Riwayat Waktu Titip"}
                            </h4>
                          </div>
                        </div>

                        <Row className="mt-2">
                          {dataDetail.transaction_type === "tempo" && (
                            <div className="table-responsive">
                              <Table className="table-nowrap">
                                <thead>
                                  <tr>
                                    <th className="text-center">Keterangan</th>
                                    <th className="text-center">Waktu Tempo</th>
                                    <th className="text-center">
                                      Status Tempo
                                    </th>
                                    <th className="text-center">Deskripsi</th>
                                    <th className="text-center">Dibayar</th>
                                    <th className="text-center">Waktu Bayar</th>
                                    <th className="text-center">Aksi</th>
                                    {/* <th className="text-center">Qty</th>
                                  <th className="text-center">Harga</th>
                                  <th className="text-end">Total</th> */}
                                  </tr>
                                </thead>

                                <tbody>
                                  {dataDueDate.map((d, i) => (
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

                                        {d.status_transaction_due_date ===
                                          "2" && (
                                          <span
                                            className={`badge badge-soft-success font-size-12 p-1`}
                                          >
                                            Sudah Selesai
                                          </span>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {d.description === null
                                          ? "-"
                                          : d.description}
                                      </td>
                                      <td className="text-center">
                                        {d.paidPrice === null
                                          ? "-"
                                          : d.paidPrice === 0
                                          ? "Rp0"
                                          : `Rp${ConvertToRupiah(d.paidPrice)}`}
                                      </td>
                                      <td className="text-center">
                                        {d.created_at === null
                                          ? "-"
                                          : `${moment(d.created_at).format(
                                              "Do MMMM YYYY"
                                            )} Pkl ${moment(
                                              d.created_at
                                            ).format("H:mm:ss")}`}
                                      </td>
                                      <td className="text-center">
                                        {d.status_transaction_due_date ===
                                          "0" && "-"}
                                        {d.status_transaction_due_date ===
                                          "1" && (
                                          <div className="d-flex gap-3 justify-content-center">
                                            <Link
                                              to="#"
                                              className="btn btn-outline-primary btn-sm"
                                              onClick={() =>
                                                handleShowModalEditTempo(
                                                  d.transaction_due_date_id
                                                )
                                              }
                                            >
                                              <i className="mdi mdi-pencil" />{" "}
                                              Input Tempo
                                            </Link>
                                          </div>
                                        )}
                                        {d.status_transaction_due_date ===
                                          "2" && (
                                          <div className="d-flex gap-3 justify-content-center">
                                            <Link
                                              to="#"
                                              className="btn btn-outline-primary btn-sm"
                                              onClick={() =>
                                                handleDownloadInvoiceTempo(
                                                  d.transaction_due_date_id,
                                                  d.tempoDetailId
                                                )
                                              }
                                            >
                                              <i className="mdi mdi-download" />{" "}
                                              Download Invoice
                                            </Link>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          )}

                          {dataDetail.transaction_type === "titip" && (
                            <Fragment>
                              {dataDueDate.map((d, i) => {
                                return (
                                  <Col md="12" className="mt-1" key={i}>
                                    <Card className="border shadow-none">
                                      <CardBody>
                                        <Row className="mb-4 align-items-center">
                                          <div className="col-6 col-md-6">
                                            <h4 className="m-0 font-size-18">
                                              Waktu Titip Ke {d.titip}
                                            </h4>
                                          </div>
                                          <div className="col-6 col-md-6 text-end">
                                            {d.status_transaction_due_date ===
                                              "1" && (
                                              <Link
                                                to="#"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() =>
                                                  handleShowModalEditTitip(i)
                                                }
                                              >
                                                <i className="mdi mdi-pencil" />{" "}
                                                Input Titip
                                              </Link>
                                              // <Button
                                              //   color="warning"
                                              //   size="sm"
                                              //   onClick={() =>
                                              //     handleShowModalEditTitip(i)
                                              //   }
                                              // >
                                              //   <i className="fas fa-pencil-alt" />{" "}
                                              //   Input Titip
                                              // </Button>
                                            )}

                                            {d.status_transaction_due_date ===
                                              "2" && (
                                              <div className="d-flex gap-3 justify-content-end">
                                                <Link
                                                  to="#"
                                                  className="btn btn-outline-primary btn-sm"
                                                  onClick={() =>
                                                    handleDownloadInvoiceTitip(
                                                      d.id_transaction_transaction_due_date,
                                                      d.transaction_due_date_id
                                                    )
                                                  }
                                                >
                                                  <i className="mdi mdi-download" />{" "}
                                                  Download Invoice
                                                </Link>
                                              </div>
                                            )}
                                          </div>
                                        </Row>

                                        <Row className="mb-2">
                                          <Col md="4" className="mb-2">
                                            <Row>
                                              <Col md="12">Masa Tenggang</Col>
                                              <Col md="12">
                                                <div className="text-muted">
                                                  {moment(d.start_date).format(
                                                    "Do MMMM YYYY"
                                                  )}{" "}
                                                  s.d.{" "}
                                                  {moment(d.end_date).format(
                                                    "Do MMMM YYYY"
                                                  )}
                                                </div>
                                              </Col>
                                            </Row>
                                          </Col>
                                          <Col md="3" className="mb-2">
                                            <Row>
                                              <Col md="12">Status</Col>
                                              <Col md="12">
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
                                                    Lewat Masa Tenggang
                                                  </span>
                                                )}

                                                {d.status_transaction_due_date ===
                                                  "2" && (
                                                  <span
                                                    className={`badge badge-soft-success font-size-12 p-1`}
                                                  >
                                                    Sudah Selesai
                                                  </span>
                                                )}
                                              </Col>
                                            </Row>
                                          </Col>
                                          <Col md="3" className="mb-2">
                                            <Row>
                                              <Col md="12">Waktu Kunjungan</Col>
                                              {d.visit_date === null && (
                                                <div className="text-muted">
                                                  Belum Tersedia
                                                </div>
                                              )}

                                              {d.visit_date !== null && (
                                                <div className="text-muted">
                                                  {moment(d.visit_date).format(
                                                    "Do MMMM YYYY"
                                                  )}{" "}
                                                  Pkl{" "}
                                                  {moment(d.visit_date).format(
                                                    "H:mm:ss"
                                                  )}
                                                </div>
                                              )}
                                            </Row>
                                          </Col>
                                        </Row>

                                        <Row>
                                          <TableComponents
                                            column={[
                                              "Produk",
                                              "Harga Jual",
                                              "Jumlah Tersedia",
                                              "Jumlah Terjual",
                                              "Total Dibayar",
                                            ]}
                                            row={d.product}
                                          />
                                        </Row>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                );
                              })}
                            </Fragment>
                          )}

                          {isShowAddButtonDueDate &&
                            dataDetail.transaction_type === "tempo" && (
                              <Col md="12" style={{ marginTop: 5 }}>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={handleShowModalAddDueDate}
                                >
                                  <i className="fas fa-plus" /> Tambah Waktu
                                  Tempo
                                </Button>
                              </Col>
                            )}

                          {isShowAddButtonDueDate &&
                            dataDetail.transaction_type === "titip" &&
                            dataDetail.transactionStatus === "0" && (
                              <Col md="12" style={{ marginTop: 5 }}>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={handleShowModalAddDueDate}
                                >
                                  <i className="fas fa-plus" /> Tambah Waktu
                                  Titip
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
                          <div className="offset-md-6 offset-12 bg-light p-1">
                            {(dataDetail.transaction_type === "tempo" ||
                              dataDetail.transaction_type === "titip") && (
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
                                      {dataDetail.total_paid_price === null ||
                                      dataDetail.total_paid_price === 0
                                        ? "0"
                                        : ConvertToRupiah(
                                            dataDetail.total_paid_price
                                          )}
                                    </h4>
                                  </div>
                                </Row>

                                {dataDetail.transaction_type === "tempo" && (
                                  <Row>
                                    <div className="col-6 col-md-6">
                                      <h4 className="font-size-16 m-0 p-1 text-primary">
                                        Sisa Tagihan
                                      </h4>
                                    </div>
                                    <div className="col-6 col-md-6 text-end">
                                      <h4 className="font-size-16 m-0 p-1 text-primary">
                                        Rp
                                        {dataDetail.total_bill_price === null ||
                                        dataDetail.total_bill_price === 0
                                          ? "0"
                                          : ConvertToRupiah(
                                              dataDetail.total_bill_price
                                            )}
                                      </h4>
                                    </div>
                                  </Row>
                                )}
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
                                  Rp{ConvertToRupiah(dataDetail.subtotal_price)}
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
                          to={`${
                            position === "0"
                              ? "/admin"
                              : position === "2"
                              ? "/sales"
                              : ""
                          }/transaction`}
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

                        {dataDetail.transaction_type === "titip" &&
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
            {/* <Alert
              isOpen={alert.isOpen}
              title={alert.title}
              message={alert.message}
              color={alert.color}
              toggle={() => {
                setAlert(oldState => ({
                  ...oldState,
                  isOpen: false,
                  title: "",
                  color: "",
                  message: ``,
                }));
              }}
            /> */}
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
          onSubmit={handleSubmitAddDueDate}
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

      {modalEditTitip.isOpen && (
        <Modal
          isOpen={modalEditTitip.isOpen}
          title={modalEditTitip.title}
          onClose={handleCloseModalEditTitip}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitEditTitip}
          isDisabledButtonLeft={isDisabledButtonModal}
          isDisabledButtonRight={isDisabledButtonModal}
          size="lg"
        >
          <Form>
            {listInputEditTitip.map((d, i) => {
              return (
                <div className="mb-3" key={i}>
                  <Row>
                    <div className="col-6 col-md-3 mb-3">
                      <span>Produk</span> <br />
                      <span className="text-muted">{d.name}</span>
                    </div>
                    <div className="col-6 col-md-3 mb-3">
                      <span>Jumlah Tersedia</span> <br />
                      <span className="text-muted">{d.totalLeft}</span>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <span>Harga Jual</span> <br />
                      <span className="text-muted">
                        Rp
                        {ConvertToRupiah(d.sellPrice)}
                      </span>
                    </div>
                    <div className="col-6 col-md-2 mb-3">
                      <span>Jumlah Terjual</span> <br />
                      <Input
                        value={d.totalSell.value}
                        name="totalSell"
                        type="text"
                        className="form-control"
                        onChange={e => handleChangeInputEditTitip(e, i)}
                        placeholder="Jumlah"
                      />
                      {d.totalSell.error && (
                        <p className="text-danger">{d.totalSell.error}</p>
                      )}
                    </div>
                    <div className="col-md-2 text-end">
                      <span>Total </span> <br />
                      <span className="text-muted">
                        {d.total ? `Rp${ConvertToRupiah(d.total)}` : "Rp0"}
                      </span>
                    </div>
                  </Row>
                  <hr />
                </div>
              );
            })}

            <Row>
              <div className="col-6 col-md-6">
                <h4 className="font-size-16 m-0 p-1">Subtotal</h4>
              </div>
              <div className="col-6 col-md-6 text-end">
                <h4 className="font-size-16 m-0 p-1">
                  {subTotalTitipPrice
                    ? `Rp${ConvertToRupiah(subTotalTitipPrice)}`
                    : "Rp0"}
                </h4>
              </div>
            </Row>
          </Form>
        </Modal>
      )}

      {modalMessage.isOpen && (
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
      )}

      {toast.isOpen && (
        <Toast
          isOpen={toast.isOpen}
          title={toast.title}
          message={toast.message}
          bgColor={toast.bgColor}
          onClose={() => {
            setToast(oldState => ({
              ...oldState,
              isOpen: false,
              title: "",
              message: ``,
              bgColor: "",
            }));
          }}
        />
      )}

      {isModalLoading && <ModalLoading isOpen={isModalLoading} />}
    </div>
  );
};

DetailTransaction.propTypes = {
  match: PropTypes.object,
};

export default DetailTransaction;
