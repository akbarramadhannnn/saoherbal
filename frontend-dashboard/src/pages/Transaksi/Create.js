import React, { useState, useCallback, useEffect, useMemo } from "react";
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
} from "reactstrap";
import Breadcrumbs from "./../../components/Common/Breadcrumb";
// import Alert from "./../../../components/Alert";
import { MetaTags } from "react-meta-tags";

import { ApiGetListStore } from "../../api/store";
import { ApiGetListDistributor } from "../../api/distributor";
import { ApiGetListProduct } from "../../api/product";
import { ConvertToRupiah } from "../../utils/convert";

const Create = () => {
  const [dataTypeKonsumen] = useState(["Store", "Distributor"]);
  const [dataStore, setDataStore] = useState([]);
  const [dataDistributor, setDataDistributor] = useState([]);
  const [dataKonsumen, setDataKonsumen] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataPriceList, setDataPriceList] = useState([]);

  const [valueTypeKonsumen, setValueTypeKonsumen] = useState("");
  const [errorValueTypeKonsumen, setErrorValueTypeKonsumen] = useState("");
  const [valueKonsumenId, setValueKonsumenId] = useState("");
  const [errorValueKonsumenId, setErrorValueKonsumenId] = useState("");
  const [valueProductId, setValueProductId] = useState("");
  const [errorValueProductId, setErrorValueProductId] = useState("");
  const [valuePriceId, setValuePriceId] = useState("");
  const [valuePrice, setValuePrice] = useState(0);
  const [errorValuePriceId, setErrorValuePriceId] = useState("");
  const [valueQty, setValueQty] = useState(0);
  const [errorValueQty, setErrorQty] = useState("");
  const [valueTotalPrice, setTotalPrice] = useState(0);

  //   const [isDisabledButton, setIsDisabledButton] = useState(false);
  //   const [alert, setAlert] = useState({
  //     isOpen: false,
  //     title: "",
  //     message: "",
  //   });

  useEffect(() => {
    ApiGetListStore().then(response => {
      if (response) {
        if (response.status === 200) {
          setDataStore(response.result);
        }
      }
    });
    ApiGetListDistributor().then(response => {
      if (response) {
        if (response.status === 200) {
          setDataDistributor(response.result);
        }
      }
    });
    ApiGetListProduct().then(response => {
      if (response) {
        if (response.status === 200) {
          const dataArrProduct = [];
          for (let i = 0; i < response.result.length; i++) {
            dataArrProduct.push({
              id: response.result[i].product_id,
              name: response.result[i].product_name,
              priceList: response.result[i].price_list,
            });
          }
          setDataProduct(dataArrProduct);
        }
      }
    });
  }, []);

  useMemo(() => {
    if (valueQty === 0) {
      setTotalPrice(valuePrice);
    } else {
      const result = valuePrice * valueQty;
      setTotalPrice(result);
    }
  }, [valuePrice, valueQty]);

  const onChangeType = useCallback(
    e => {
      const { value } = e.target;

      if (value) {
        const dataArrKonsumen = [];
        if (value === "Store") {
          for (let i = 0; i < dataStore.length; i++) {
            dataArrKonsumen.push({
              id: dataStore[i].store_id,
              name: dataStore[i].name,
            });
          }
        } else if (value === "Distributor") {
          for (let i = 0; i < dataDistributor.length; i++) {
            dataArrKonsumen.push({
              id: dataDistributor[i].distributor_id,
              name: dataDistributor[i].name,
            });
          }
        } else {
          dataArrKonsumen.push("");
        }
        setDataKonsumen(dataArrKonsumen);
      } else {
        setDataKonsumen([]);
      }
      setValueTypeKonsumen(value);
      setValueKonsumenId("");
      setErrorValueTypeKonsumen("");
    },
    [dataStore, dataDistributor]
  );

  const onChangeKonsumen = useCallback(e => {
    const { value } = e.target;
    setValueKonsumenId(Number(value));
    setErrorValueKonsumenId("");
  }, []);

  const onChangeProduct = useCallback(
    e => {
      let { value } = e.target;

      if (value) {
        value = Number(value);
        const findProduct = dataProduct.find(d => d.id === value);
        setDataPriceList(findProduct.priceList);
        setValueProductId(value);
      } else {
        setValueProductId("");
        setDataPriceList([]);
      }
      setValuePriceId("");
      setValueQty(0);
      setValuePrice(0);
      setErrorValueProductId("");
    },
    [dataProduct]
  );

  const onChangePrice = useCallback(
    e => {
      let { value } = e.target;

      if (value) {
        value = Number(value);
        setValuePriceId(value);
        const findPrice = dataPriceList.find(d => d.price_id === value);
        setValuePrice(findPrice.prices);
      } else {
        setValuePriceId("");
        setValuePrice(0);
      }
      setValueQty(0);
      setErrorValuePriceId("");
    },
    [dataPriceList]
  );

  const onChangePurchaseTotal = useCallback(e => {
    const { value } = e.target;
    if (isNaN(value)) return false;
    setValueQty(Number(value));
    setErrorQty("");
  }, []);

  //   const handleCloseAlert = useCallback(() => {
  //     setAlert(oldState => ({
  //       ...oldState,
  //       isOpen: false,
  //       title: "",
  //       message: "",
  //     }));
  //   }, []);

  const handleSave = useCallback(() => {
    const payload = {
      consumer_type: valueTypeKonsumen,
      store_id: valueTypeKonsumen === "Store" ? valueKonsumenId : "",
      distributor_id:
        valueTypeKonsumen === "Distributor" ? valueKonsumenId : "",
      product_id: valueProductId,
      price_id: valuePriceId,
      qty: valueQty,
      sub_total: valueTotalPrice,
    };
    console.log("payload", payload);
    //   setIsDisabledButton(true);
    //   ApiAddListCategory(payload).then(response => {
    //     if (response) {
    //       if (response.status === 400) {
    //         if (response.result.name === "name") {
    //           setErrorName(response.message);
    //         }
    //       } else if (response.status === 201) {
    //         setName("");
    //         setAlert(oldState => ({
    //           ...oldState,
    //           isOpen: true,
    //           title: "Success",
    //           message: response.message,
    //         }));
    //       }
    //     }
    //     setIsDisabledButton(false);
    //   });
  }, [
    valueTypeKonsumen,
    valueKonsumenId,
    valueProductId,
    valuePriceId,
    valueQty,
    valueTotalPrice,
  ]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Transaksi</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Create" breadcrumbItem="Transaksi" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col className="mx-auto col-10">
                    {/* <Alert
                      isOpen={alert.isOpen}
                      title={alert.title}
                      message={alert.message}
                      color="success"
                      toggle={handleCloseAlert}
                    /> */}

                    <Form>
                      <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">
                          Tipe Konsumen
                        </Label>
                        <select
                          value={valueTypeKonsumen}
                          className="form-select"
                          onChange={onChangeType}
                        >
                          <option value="">Select Konsumen Type</option>
                          {dataTypeKonsumen.map((type, i) => (
                            <option value={type} key={i}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errorValueTypeKonsumen && (
                          <p className="text-danger">
                            {errorValueTypeKonsumen}
                          </p>
                        )}
                      </div>

                      <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">
                          Nama Toko / Distributor
                        </Label>
                        <select
                          value={valueKonsumenId}
                          className="form-select"
                          onChange={onChangeKonsumen}
                        >
                          <option value="">
                            Select Toko / Distributor Name
                          </option>
                          {dataKonsumen.map((konsumen, i) => (
                            <option value={konsumen.id} key={i}>
                              {konsumen.name}
                            </option>
                          ))}
                        </select>
                        {errorValueKonsumenId && (
                          <p className="text-danger">{errorValueKonsumenId}</p>
                        )}
                      </div>

                      <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">
                          Atur Penjualan Produk
                        </Label>

                        <Card
                          body
                          style={{
                            boxShadow: "none",
                            border: "1px solid #ced4da",
                          }}
                        >
                          <Row className="mb-3 ">
                            <Col md="4">
                              <Label htmlFor="formrow-firstname-Input">
                                Nama Produk
                              </Label>
                              <select
                                value={valueProductId}
                                className="form-select"
                                onChange={onChangeProduct}
                              >
                                <option value="">Select Product Name</option>
                                {dataProduct.map((product, i) => (
                                  <option value={product.id} key={i}>
                                    {product.name}
                                  </option>
                                ))}
                              </select>
                              {errorValueProductId && (
                                <p className="text-danger">
                                  {errorValueProductId}
                                </p>
                              )}
                            </Col>
                            <Col md="4">
                              <Label htmlFor="formrow-firstname-Input">
                                Berat Produk
                              </Label>
                              <select
                                value={valuePriceId}
                                className="form-select"
                                onChange={onChangePrice}
                              >
                                <option value="">Select Weight Product</option>
                                {dataPriceList.map((price, i) => (
                                  <option value={price.price_id} key={i}>
                                    {price.weight} / {price.unit}
                                  </option>
                                ))}
                              </select>
                              {errorValuePriceId && (
                                <p className="text-danger">
                                  {errorValuePriceId}
                                </p>
                              )}
                            </Col>
                            <Col md="4">
                              <Label htmlFor="formrow-firstname-Input">
                                Jumlah Pembelian
                              </Label>
                              <Input
                                value={valueQty}
                                type="text"
                                className="form-control"
                                id="formrow-firstname-Input"
                                onChange={onChangePurchaseTotal}
                                placeholder="Enter purchase total"
                              />
                              {errorValueQty && (
                                <p className="text-danger">{errorValueQty}</p>
                              )}
                            </Col>
                          </Row>

                          <Row>
                            <Col md={12} className="d-flex justify-content-end">
                              <h4>
                                <small className="text-muted">Subtotal</small>
                              </h4>
                            </Col>
                            <Col md={12} className="d-flex justify-content-end">
                              <h4>
                                Rp{" "}
                                {valueTotalPrice
                                  ? ConvertToRupiah(valueTotalPrice)
                                  : valueTotalPrice}
                              </h4>
                            </Col>
                          </Row>
                        </Card>
                      </div>

                      {/* <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">Name</Label>
                        <Input
                            value={name}
                          type="text"
                          className="form-control"
                          id="formrow-firstname-Input"
                            onChange={handleChangeInput}
                          placeholder="Enter category name"
                        />
                        {errorName && (
                          <p className="text-danger">{errorName}</p>
                        )}
                      </div> */}
                    </Form>
                  </Col>

                  <Col className="mx-auto col-10">
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/transaction"
                        className="btn btn-danger mb-2 me-2"
                      >
                        cancel
                      </Link>
                      <Button
                        type="button"
                        color="primary"
                        className="mb-2"
                        onClick={handleSave}
                        // disabled={isDisabledButton}
                      >
                        save
                      </Button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Create;
