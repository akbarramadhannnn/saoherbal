import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  Fragment,
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
  InputGroup,
  FormGroup,
  FormText,
  InputGroupText,
} from "reactstrap";
import Breadcrumbs from "./../../components/Common/Breadcrumb";
import ModalMessage from "./../../components/Modal/ModalMessage";
import { MetaTags } from "react-meta-tags";

import { ApiGetListStore } from "../../api/store";
import { ApiGetListDistributor } from "../../api/distributor";
import { ApiGetListProduct } from "../../api/product";
import { ApiAddLisTransaction } from "../../api/transaction";
import { ConvertToRupiah } from "../../utils/convert";

const Create = () => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const [dataTypeKonsumen] = useState(["Store", "Distributor"]);
  const [dataStore, setDataStore] = useState([]);
  const [dataDistributor, setDataDistributor] = useState([]);
  const [dataKonsumen, setDataKonsumen] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);

  const [valueTypeKonsumen, setValueTypeKonsumen] = useState("");
  const [errorValueTypeKonsumen, setErrorValueTypeKonsumen] = useState("");
  const [valueKonsumenId, setValueKonsumenId] = useState("");
  const [errorValueKonsumenId, setErrorValueKonsumenId] = useState("");
  const [valueTypeTransaction, setValueTypeTransaction] = useState("");
  const [errorValueTypeTransaction, setErrorValueTypeTransaction] =
    useState("");
  const [dueDate, setDueDate] = useState({
    startDate: {
      value: "",
      error: "",
    },
    endDate: {
      value: "",
      error: "",
    },
  });
  const [productList, setProductList] = useState([
    {
      productId: "",
      errorProductId: "",
      priceId: "",
      errorPriceId: "",
      originalPrice: "",
      discount: 0,
      discountPrice: "",
      qty: 0,
      total: 0,
      priceList: [],
    },
  ]);

  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    message: "",
    params: "",
  });

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

  const subtotal = useMemo(() => {
    const subtotal = productList.reduce((a, b) => {
      return a + b.total;
    }, 0);
    return subtotal;
  }, [productList]);

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
    let { value } = e.target;

    if (value) {
      value = Number(value);
    } else {
      value = "";
    }
    setValueKonsumenId(value);
    setErrorValueKonsumenId("");
  }, []);

  const onChangeTypeTransaction = useCallback(e => {
    const { value } = e.target;
    setValueTypeTransaction(value);
    setErrorValueTypeTransaction("");

    if (value === "cash") {
      setDueDate({
        startDate: {
          value: "",
          error: "",
        },
        endDate: {
          value: "",
          error: "",
        },
      });
    }
  }, []);

  const onChangeProduct = useCallback(
    (e, index) => {
      let { value } = e.target;
      const state = [...productList];

      if (value) {
        value = Number(value);
        const findProduct = dataProduct.find(d => d.id === value);
        state[index].productId = value;
        state[index].priceList = findProduct.priceList;
      } else {
        state[index].productId = "";
        state[index].priceList = [];
      }
      state[index].priceId = "";
      state[index].originalPrice = "";
      state[index].discount = 0;
      state[index].discountPrice = "";
      state[index].errorProductId = "";
      state[index].qty = 0;
      state[index].total = 0;
      setProductList(state);
    },
    [dataProduct, productList]
  );

  const onChangePrice = useCallback(
    (e, index) => {
      let { value } = e.target;
      const state = [...productList];

      if (value) {
        value = Number(value);
        const findPrice = state[index].priceList.find(
          d => d.price_id === value
        );
        state[index].priceId = value;
        state[index].originalPrice = ConvertToRupiah(findPrice.prices);
        state[index].total = findPrice.prices;
      } else {
        state[index].priceId = "";
        state[index].originalPrice = "";
        state[index].total = 0;
      }
      state[index].qty = 0;
      state[index].errorPriceId = "";
      setProductList(state);
    },
    [productList]
  );

  const onChangeDiscount = useCallback(
    (e, index) => {
      let { value } = e.target;

      if (value.length > 3) return false;

      value = Number(value);

      if (isNaN(value)) return false;

      const state = [...productList];
      state[index].discount = value;

      if (state[index].originalPrice || state[index].qty) {
        const originalPrice = Number(
          state[index].originalPrice.replace(/\./g, "")
        );
        const countDiscount = (value / 100) * originalPrice;
        const totalPriceDiscount = originalPrice - countDiscount;
        let total;

        if (state[index].qty) {
          total = totalPriceDiscount * state[index].qty;
        } else {
          total = totalPriceDiscount;
        }

        state[index].total = total;
        state[index].discountPrice = ConvertToRupiah(totalPriceDiscount);
      }

      setProductList(state);
    },
    [productList]
  );

  const onChangeQuantity = useCallback(
    (e, index) => {
      let { value } = e.target;
      value = Number(value);
      const state = [...productList];
      state[index].qty = value;

      if (isNaN(value)) return false;

      if (value) {
        const originalPrice = Number(
          state[index].originalPrice.replace(/\./g, "")
        );
        if (originalPrice) {
          const countDiscount = (state[index].discount / 100) * originalPrice;
          const total = (originalPrice - countDiscount) * value;
          state[index].total = total;
        }
      } else {
        const originalPrice = Number(
          state[index].originalPrice.replace(/\./g, "")
        );

        if (originalPrice) {
          const countDiscount = (state[index].discount / 100) * originalPrice;
          const total = (originalPrice - countDiscount) * 1;
          state[index].total = total;
        }
      }

      setProductList(state);
    },
    [productList]
  );

  const handleAddProuctList = useCallback(() => {
    const data = {
      productId: "",
      errorProductId: "",
      priceId: "",
      errorPriceId: "",
      originalPrice: "",
      discount: 0,
      discountPrice: "",
      qty: 0,
      total: 0,
      priceList: [],
    };
    setProductList(oldState => [...oldState, data]);
  }, []);

  const onChangeDateJatuhTempo = useCallback(e => {
    let { name, value } = e.target;

    setDueDate(oldState => ({
      ...oldState,
      [name]: {
        value: value,
        error: "",
      },
    }));
  }, []);

  const handleDeleteProuctList = useCallback(
    index => {
      const oldState = [...productList];
      oldState.splice(index, 1);
      setProductList(oldState);
    },
    [productList]
  );

  const handleSave = useCallback(() => {
    if (valueTypeKonsumen === "") {
      setErrorValueTypeKonsumen("Silahkan pilih tipe konsumen");
    } else if (valueKonsumenId === "") {
      setErrorValueKonsumenId("Silahkan pilih nama toko/distributor");
    } else if (valueTypeTransaction === "") {
      setErrorValueTypeTransaction("Silahkan pilih tipe transaksi");
    } else if (
      (valueTypeTransaction === "titip" || valueTypeTransaction === "tempo") &&
      dueDate.startDate.value === ""
    ) {
      setDueDate(oldState => ({
        ...oldState,
        startDate: {
          ...oldState.startDate,
          error: "Silahkan pilih tanggal awal",
        },
      }));
    } else if (
      (valueTypeTransaction === "titip" || valueTypeTransaction === "tempo") &&
      dueDate.endDate.value === ""
    ) {
      setDueDate(oldState => ({
        ...oldState,
        endDate: {
          ...oldState.endDate,
          error: "Silahkan pilih tanggal akhir",
        },
      }));
    } else {
      const filterValueProduct = productList.filter(d => d.productId === "");
      const filterValuePrice = productList.filter(d => d.priceId === "");

      if (filterValueProduct.length || filterValuePrice.length) {
        let stateProductList = [...productList];

        for (let i = 0; i < productList.length; i++) {
          if (stateProductList[i].productId === "") {
            stateProductList[i].errorProductId = "Silahkan pilih product";
          }
          if (stateProductList[i].priceId === "") {
            stateProductList[i].errorPriceId = "Silahkan pilih berat";
          }
        }
        setProductList(stateProductList);
      } else {
        const arrDataProduct = [];
        for (let i = 0; i < productList.length; i++) {
          arrDataProduct.push({
            productId: productList[i].productId,
            priceId: productList[i].priceId,
            discount: productList[i].discount,
            qty: productList[i].qty,
          });
        }
        const payload = {
          consumer_type: valueTypeKonsumen,
          store_id: valueTypeKonsumen === "Store" ? valueKonsumenId : "",
          distributor_id:
            valueTypeKonsumen === "Distributor" ? valueKonsumenId : "",
          transaction_type: valueTypeTransaction,
          productList: arrDataProduct,
        };

        if (
          valueTypeTransaction === "titip" ||
          valueTypeTransaction === "tempo"
        ) {
          payload.dueDate = {
            startDate: dueDate.startDate.value,
            endDate: dueDate.endDate.value,
          };
        }

        setIsDisabledButton(true);
        ApiAddLisTransaction(payload).then(response => {
          if (response) {
            if (response.status === 400) {
              if (response.result.name === "name") {
                setErrorName(response.message);
              }
            } else if (response.status === 201) {
              setValueTypeKonsumen("");
              setValueKonsumenId("");
              setValueTypeTransaction("");
              setDueDate({
                startDate: {
                  value: "",
                  error: "",
                },
                endDate: {
                  value: "",
                  error: "",
                },
              });
              setProductList([
                {
                  productId: "",
                  errorProductId: "",
                  priceId: "",
                  errorPriceId: "",
                  originalPrice: "",
                  discount: 0,
                  discountPrice: "",
                  qty: 0,
                  total: 0,
                  priceList: [],
                },
              ]);
              setModalMessage({
                isOpen: true,
                message: "Add Transaction Successfully",
                params: "success",
              });
            }
          }
          setIsDisabledButton(false);
        });
      }
    }
  }, [
    valueTypeKonsumen,
    valueKonsumenId,
    valueTypeTransaction,
    dueDate,
    productList,
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
                    <Form>
                      <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">
                          Tipe Konsumen
                        </Label>
                        <Row>
                          {dataTypeKonsumen.map((type, i) => (
                            <Col className="col-6 col-md-auto" key={i}>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="radio"
                                    value={type}
                                    checked={valueTypeKonsumen === type}
                                    onChange={onChangeType}
                                  />{" "}
                                  {type}
                                </Label>
                              </FormGroup>
                            </Col>
                          ))}
                        </Row>
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
                          Jenis Transaksi
                        </Label>
                        <Row>
                          <Col className="col-6 col-md-auto">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="radio"
                                  value="cash"
                                  checked={valueTypeTransaction === "cash"}
                                  onChange={onChangeTypeTransaction}
                                />{" "}
                                Cash
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col className="col-6 col-md-auto">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="radio"
                                  value="titip"
                                  checked={valueTypeTransaction === "titip"}
                                  onChange={onChangeTypeTransaction}
                                />{" "}
                                Titip
                              </Label>
                            </FormGroup>
                          </Col>

                          <Col md="auto">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type="radio"
                                  value="tempo"
                                  checked={valueTypeTransaction === "tempo"}
                                  onChange={onChangeTypeTransaction}
                                />{" "}
                                Jatuh Tempo
                              </Label>
                            </FormGroup>
                          </Col>

                          {errorValueTypeTransaction && (
                            <p className="text-danger">
                              {errorValueTypeTransaction}
                            </p>
                          )}
                        </Row>
                      </div>

                      {(valueTypeTransaction === "titip" ||
                        valueTypeTransaction === "tempo") && (
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Tenggang Waktu
                          </Label>

                          <Row>
                            <Col className="col-12 col-md-4 mb-2">
                              <p className="p-0 m-0 mb-1 text-secondary">
                                Tanggal Awal
                              </p>
                              <Input
                                type="date"
                                name="startDate"
                                value={dueDate.startDate.value}
                                onChange={onChangeDateJatuhTempo}
                              />
                              {dueDate.startDate.error && (
                                <p className="text-danger">
                                  {dueDate.startDate.error}
                                </p>
                              )}
                            </Col>
                            <Col className="col-12 col-md-auto mb-2 text-center">
                              <p className="p-0 mb-0 mt-md-4 mt-lg-4">s.d.</p>
                            </Col>
                            <Col className="col-12 col-md-4 mb-2">
                              <p className="p-0 m-0 mb-1 text-secondary">
                                Tanggal Akhir
                              </p>
                              <Input
                                type="date"
                                name="endDate"
                                value={dueDate.endDate.value}
                                onChange={onChangeDateJatuhTempo}
                              />
                              {dueDate.endDate.error && (
                                <p className="text-danger">
                                  {dueDate.endDate.error}
                                </p>
                              )}
                            </Col>
                          </Row>
                        </div>
                      )}

                      <div className="mb-3 ">
                        <Label htmlFor="formrow-firstname-Input">
                          List Produk
                        </Label>

                        <Card
                          body
                          style={{
                            boxShadow: "none",
                            border: "1px solid #ced4da",
                          }}
                        >
                          {productList.map((pl, i) => (
                            <Fragment key={i}>
                              <Row className="mb-3">
                                <Col md="6">
                                  <h5>Product Ke {i + 1}</h5>
                                </Col>

                                {i !== 0 && (
                                  <Col md="6" className="text-end">
                                    <Button
                                      size="sm"
                                      color="danger"
                                      onClick={() => handleDeleteProuctList(i)}
                                    >
                                      <i className="fa fa-times fs-6" />
                                    </Button>
                                  </Col>
                                )}
                              </Row>

                              <Row
                                className="pb-4 mb-4"
                                style={{
                                  borderBottomColor: "#d3d3d3",
                                  borderBottomStyle: "solid",
                                  borderBottomWidth: 0.7,
                                }}
                              >
                                <Col md="12">
                                  <Row>
                                    <Col md="9" className="mb-3">
                                      <Label htmlFor="formrow-firstname-Input">
                                        Nama Produk
                                      </Label>
                                      <select
                                        value={pl.productId}
                                        className="form-select"
                                        onChange={e => onChangeProduct(e, i)}
                                      >
                                        <option value="">Select Product</option>
                                        {dataProduct.map((product, i) => (
                                          <option value={product.id} key={i}>
                                            {product.name}
                                          </option>
                                        ))}
                                      </select>
                                      {pl.errorProductId && (
                                        <p className="text-danger">
                                          {pl.errorProductId}
                                        </p>
                                      )}
                                    </Col>

                                    <Col md="3" className="mb-3">
                                      <Label htmlFor="formrow-firstname-Input">
                                        Berat Produk
                                      </Label>
                                      <select
                                        value={pl.priceId}
                                        className="form-select"
                                        onChange={e => onChangePrice(e, i)}
                                      >
                                        <option value="">Select Weight</option>
                                        {pl.priceList.map((price, i) => (
                                          <option
                                            value={price.price_id}
                                            key={i}
                                          >
                                            {price.weight} / {price.unit}
                                          </option>
                                        ))}
                                      </select>
                                      {pl.errorPriceId && (
                                        <p className="text-danger">
                                          {pl.errorPriceId}
                                        </p>
                                      )}
                                    </Col>
                                  </Row>
                                </Col>

                                <Col md="3" className="mb-3">
                                  <Label>Harga Asli</Label>
                                  <InputGroup>
                                    <InputGroupText>Rp</InputGroupText>
                                    <Input
                                      value={pl.originalPrice}
                                      disabled={true}
                                      type="text"
                                      className="form-control"
                                      placeholder="Harga asli"
                                    />
                                  </InputGroup>
                                </Col>

                                <Col md="3" className="mb-3">
                                  <Label>Diskon</Label>
                                  <InputGroup>
                                    <Input
                                      value={pl.discount}
                                      type="text"
                                      className="form-control"
                                      onChange={e => onChangeDiscount(e, i)}
                                      placeholder="Quantity"
                                    />
                                    <InputGroupText>%</InputGroupText>
                                  </InputGroup>
                                </Col>

                                <Col md="3" className="mb-3">
                                  <Label>Harga Diskon</Label>
                                  <InputGroup>
                                    <InputGroupText>Rp</InputGroupText>
                                    <Input
                                      value={pl.discountPrice}
                                      disabled={true}
                                      type="text"
                                      className="form-control"
                                      placeholder="Harga diskon"
                                    />
                                  </InputGroup>
                                </Col>

                                <Col md="3" className="mb-3">
                                  <Label>Qty</Label>
                                  <Input
                                    value={pl.qty}
                                    type="text"
                                    className="form-control"
                                    onChange={e => onChangeQuantity(e, i)}
                                    placeholder="Quantity"
                                  />
                                </Col>

                                <Col md="12" className="text-end mb-3">
                                  <Label>Total</Label>
                                  <h4>
                                    Rp
                                    {pl.total
                                      ? ConvertToRupiah(pl.total)
                                      : pl.total}
                                  </h4>
                                </Col>
                              </Row>
                            </Fragment>
                          ))}

                          <Col md="12">
                            <Row className="align-items-center">
                              <Col
                                md="6"
                                lg="6"
                                xl="6"
                                className="order-md-2 text-end mt-2 mb-2"
                              >
                                <Label>Subtotal : </Label>
                                <h4>
                                  Rp
                                  {subtotal
                                    ? ConvertToRupiah(subtotal)
                                    : subtotal}
                                </h4>
                              </Col>
                              <Col
                                md="6"
                                lg="6"
                                xl="6"
                                className="order-md-1 mt-2 mb-2"
                              >
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={handleAddProuctList}
                                >
                                  <i className="fas fa-plus" /> Tambah Product
                                </Button>
                              </Col>
                            </Row>

                            {/* <Row className="align-items-center">
                              <Col md="6" className="order-md-2">
                                <Button
                                  size="sm"
                                  color="primary"
                                  onClick={handleAddProuctList}
                                >
                                  <i className="fas fa-plus" /> Tambah Product
                                </Button>
                              </Col>

                              <Col md="6" className="text-end order-md-1">
                                Subtotal :{" "}
                                <h4>Rp{ConvertToRupiah(subtotal)}</h4>
                              </Col>
                            </Row> */}
                          </Col>
                        </Card>
                      </div>
                    </Form>
                  </Col>

                  <Col className="mx-auto col-10">
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
                        cancel
                      </Link>
                      <Button
                        type="button"
                        color="primary"
                        className="mb-2"
                        onClick={handleSave}
                        disabled={isDisabledButton}
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

export default Create;
