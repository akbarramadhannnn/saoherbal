import React, { useState, useCallback, useEffect } from "react";
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
  InputGroupText,
} from "reactstrap";
import Breadcrumbs from "./../../../components/Common/Breadcrumb";
import Alert from "./../../../components/Alert";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";
import { ApiGetListCategory } from "../../../api/category";
import { ApiDetailListVariant } from "../../../api/variant";
import { ApiUploadSingleImage } from "../../../api/file";
import DataJenis from "./../../../data/jenis";
import { ConvertToRupiah } from "../../../utils/convert";
import { RegexAllowNumberWithDot } from "../../../utils/regex";
import { ReplaceDot } from "../../../utils/replace";
import { ApiAddListProduct } from "../../../api/product";

const Create = () => {
  const [dataCategory, setDataCategory] = useState([]);
  const [dataVariant, setDataVariant] = useState([]);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [category, setCategory] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [variant, setVariant] = useState("");
  const [errorVariant, setErrorVariant] = useState("");
  const [desc, setDesc] = useState("");
  const [errorDesc, setErrorDesc] = useState("");
  const [image, setImage] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [priceList, setPriceList] = useState([
    {
      unit: {
        value: "",
        error: "",
      },
      weight: {
        value: "",
        error: "",
      },
      price: {
        value: "",
        error: "",
      },
    },
  ]);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    ApiGetListCategory().then(response => {
      if (response) {
        if (response.status === 200) {
          setDataCategory(response.result.data);
        }
      }
    });
  }, []);

  const onChangeCategory = useCallback(e => {
    let { value } = e.target;
    if (value) {
      value = Number(value);
      ApiDetailListVariant("", value).then(response => {
        if (response) {
          if (response.status === 200) {
            setDataVariant(response.result);
          } else if (response.status === 204) {
            setDataVariant([]);
          }
        }
      });
    } else {
      setDataVariant([]);
      value = "";
    }
    setCategory(value);
    setErrorCategory("");
    setVariant("");
  }, []);

  const onChangeVariant = useCallback(e => {
    const { value } = e.target;
    setVariant(Number(value));
    setErrorVariant("");
  }, []);

  const onChangeName = useCallback(e => {
    setName(e.target.value);
    setErrorName("");
  }, []);

  const onChangePriceList = useCallback((e, idx) => {
    let { value, name } = e.target;
    let payload = {
      value: "",
      error: "",
    };

    if (name === "unit") {
      payload.value = value;
    } else if (name === "weight") {
      if (isNaN(value)) return false;
      payload.value = Number(value);
    } else if (name === "price") {
      if (value) {
        const regex = new RegExp(RegexAllowNumberWithDot);
        if (!regex.test(value)) return false;
        const replaceDot = ReplaceDot(value);
        payload.value = ConvertToRupiah(replaceDot);
      }
    }

    setPriceList(oldState => {
      const state = [...oldState];
      state[idx] = {
        ...state[idx],
        [name]: payload,
      };
      return state;
    });
  }, []);

  const addMultiple = useCallback(() => {
    const data = {
      unit: {
        value: "",
        error: "",
      },
      weight: {
        value: "",
        error: "",
      },
      price: {
        value: "",
        error: "",
      },
    };
    setPriceList(oldState => [...oldState, data]);
  }, []);

  const deleteMultiple = useCallback(
    idx => {
      const oldState = [...priceList];
      oldState.splice(idx, 1);
      setPriceList(oldState);
    },
    [priceList]
  );

  const onChangeDesc = useCallback(e => {
    setDesc(e.target.value);
    setErrorDesc("");
  }, []);

  const onChangeImg = useCallback(e => {
    const formData = new FormData();
    formData.append("name", "product");
    formData.append("image", e.target.files[0]);
    ApiUploadSingleImage(formData).then(response => {
      if (response) {
        if (response.status === 201) {
          setImage(response.result.path);
          setErrorImage("");
        }
      }
    });
    // setImage(URL.createObjectURL(e.target.files[0]));
  }, []);

  const handleCloseAlert = useCallback(() => {
    setAlert(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      message: "",
    }));
  }, []);

  const handleSave = useCallback(() => {
    const indexUnit = priceList.findIndex(d => d.unit.value === "");
    const indexWeight = priceList.findIndex(d => d.weight.value === "");
    const indexPrice = priceList.findIndex(d => d.price.value === "");

    if (category === "") {
      setErrorCategory("Category is Required");
      return false;
    } else if (variant === "") {
      setErrorVariant("variant is Required");
      return false;
    } else if (name === "") {
      setErrorName("Name is Required");
      return false;
    } else if (indexUnit >= 0) {
      const state = [...priceList];
      state[indexUnit].unit.error = "Jenis is Required";
      setPriceList(state);
      return false;
    } else if (indexWeight >= 0) {
      const state = [...priceList];
      state[indexWeight].weight.error = "Satuan is Required";
      setPriceList(state);
      return false;
    } else if (indexPrice >= 0) {
      const state = [...priceList];
      state[indexPrice].price.error = "Harga is Required";
      setPriceList(state);
      return false;
    } else if (desc === "") {
      setErrorDesc("Description is Required");
      return false;
    } else if (image === "") {
      setErrorImage("Image is Required");
      return false;
    }
    setIsDisabledButton(true);
    const dataPriceArr = [];
    for (let i = 0; i < priceList.length; i++) {
      dataPriceArr.push({
        unit: priceList[i].unit.value,
        weight: priceList[i].weight.value,
        price: Number(ReplaceDot(priceList[i].price.value)),
      });
    }
    const payload = {
      name: name,
      category_id: category,
      variant_id: variant,
      description: desc,
      priceList: dataPriceArr,
      image: image,
    };

    ApiAddListProduct(payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "name") {
            setErrorName(response.message);
          } else if (response.result.name === "category_id") {
            setErrorCategory(response.message);
          } else if (response.result.name === "variant_id") {
            setErrorVariant(response.message);
          } else if (response.result.name === "description") {
            setErrorDesc(response.message);
          } else if (response.result.name === "image") {
            setErrorImage(response.message);
          }
        } else if (response.status === 201) {
          setCategory("");
          setVariant("");
          setName("");
          setPriceList([
            {
              unit: {
                value: "",
                error: "",
              },
              weight: {
                value: "",
                error: "",
              },
              price: {
                value: "",
                error: "",
              },
            },
          ]);
          setDesc("");
          setImage("");
          document.getElementById("form-add-product").reset();
          setAlert(oldState => ({
            ...oldState,
            isOpen: true,
            title: "Success",
            message: response.message,
          }));
        }
        setIsDisabledButton(false);
      }
    });
  }, [name, category, variant, desc, priceList, image]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Product</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Create" breadcrumbItem="product" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <Col className="mx-auto col-10">
                      <Alert
                        isOpen={alert.isOpen}
                        title={alert.title}
                        message={alert.message}
                        color="success"
                        toggle={handleCloseAlert}
                      />
                      <Form id="form-add-product">
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Category
                          </Label>
                          <select
                            value={category}
                            className="form-select"
                            onChange={onChangeCategory}
                          >
                            <option value="">Select Category</option>
                            {dataCategory.map((category, i) => (
                              <option value={category.category_id} key={i}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errorCategory && (
                            <p className="text-danger">{errorCategory}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Variant
                          </Label>
                          <select
                            value={variant}
                            className="form-select"
                            onChange={onChangeVariant}
                          >
                            <option value="">Select Variant</option>
                            {dataVariant.map((variant, i) => (
                              <option value={variant.variant_id} key={i}>
                                {variant.name}
                              </option>
                            ))}
                          </select>
                          {errorVariant && (
                            <p className="text-danger">{errorVariant}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">Name</Label>
                          <Input
                            value={name}
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeName}
                            placeholder="Enter product Name"
                          />
                          {errorName && (
                            <p className="text-danger">{errorName}</p>
                          )}
                        </div>

                        <div className="mb-3 ">
                          <Col className="d-flex align-items-center justify-content-between">
                            <Col>
                              <Label>Harga</Label>
                            </Col>
                          </Col>

                          {priceList.map((m, idx) => {
                            return (
                              <Row key={idx}>
                                <Col md="12">
                                  <Card
                                    body
                                    style={{
                                      boxShadow: "none",
                                      border: "1px solid #ced4da",
                                    }}
                                  >
                                    {idx !== 0 && (
                                      <div
                                        className="mb-3"
                                        onClick={() => deleteMultiple(idx)}
                                        style={{
                                          cursor: "pointer",
                                          position: "absolute",
                                          right: -13,
                                          top: -13,
                                        }}
                                      >
                                        <i className="fas fa-window-close fs-2 text-danger" />
                                      </div>
                                    )}

                                    <Col md="12" xs="12">
                                      <Row>
                                        <Col md="4" className="mb-3 mb-sm-0">
                                          <select
                                            value={m.unit.value}
                                            className="form-select"
                                            onChange={e =>
                                              onChangePriceList(e, idx)
                                            }
                                            name="unit"
                                          >
                                            <option value="">
                                              Select Jenis
                                            </option>
                                            {DataJenis.map((s, idx) => {
                                              return (
                                                <option
                                                  value={s.kode}
                                                  key={idx}
                                                >
                                                  {s.name}
                                                </option>
                                              );
                                            })}
                                          </select>
                                          {m.unit.error && (
                                            <p className="text-danger">
                                              {m.unit.error}
                                            </p>
                                          )}
                                        </Col>
                                        <Col md="4" className="mb-3 mb-sm-0">
                                          <InputGroup>
                                            <Input
                                              value={m.weight.value}
                                              type="text"
                                              className="form-control"
                                              id="formrow-firstname-Input"
                                              placeholder="Enter satuan"
                                              onChange={e =>
                                                onChangePriceList(e, idx)
                                              }
                                              name="weight"
                                            />
                                            <InputGroupText>
                                              {m.unit.value}
                                            </InputGroupText>
                                          </InputGroup>
                                          {m.weight.error && (
                                            <p className="text-danger">
                                              {m.weight.error}
                                            </p>
                                          )}
                                        </Col>
                                        <Col md="4" className="mb-3 mb-sm-0">
                                          <InputGroup>
                                            <InputGroupText>Rp</InputGroupText>
                                            <Input
                                              value={m.price.value}
                                              type="text"
                                              className="form-control"
                                              id="formrow-firstname-Input"
                                              placeholder="Enter price"
                                              onChange={e =>
                                                onChangePriceList(e, idx)
                                              }
                                              name="price"
                                            />
                                          </InputGroup>
                                          {m.price.error && (
                                            <p className="text-danger">
                                              {m.price.error}
                                            </p>
                                          )}
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Card>
                                </Col>
                              </Row>
                            );
                          })}

                          <Col md="12" style={{ marginTop: -12 }}>
                            <Button
                              size="sm"
                              color="primary"
                              onClick={addMultiple}
                            >
                              <i className="fas fa-plus" /> Tambah Harga
                            </Button>
                          </Col>
                        </div>

                        <div className="mb-3 ">
                          <Label>Description</Label>
                          <Input
                            value={desc}
                            type="textarea"
                            id="textarea"
                            rows="4"
                            placeholder="Enter product description"
                            onChange={onChangeDesc}
                          />
                          {errorDesc && (
                            <p className="text-danger">{errorDesc}</p>
                          )}
                        </div>
                        <div className="mb-3">
                          <Input
                            type="file"
                            className="form-control"
                            id="inputGroupFile02"
                            onChange={onChangeImg}
                            accept="image/png, image/gif, image/jpeg"
                          />
                          {errorImage && (
                            <p className="text-danger">{errorImage}</p>
                          )}
                        </div>
                      </Form>
                    </Col>

                    <Col className="mx-auto col-10">
                      <div className="d-flex justify-content-end">
                        <Link
                          to="/admin/master/product"
                          className="btn btn-danger me-2"
                        >
                          cancel
                        </Link>
                        <Button
                          type="button"
                          color="primary"
                          disabled={isDisabledButton}
                          onClick={handleSave}
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
    </React.Fragment>
  );
};

export default Create;
