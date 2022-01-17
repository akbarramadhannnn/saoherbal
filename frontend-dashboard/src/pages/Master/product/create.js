import React, { useState } from "react";
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
import Breadcrumbs from "./../../../components/Common/Breadcrumb";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";
import satuanDataDummy from "./../../../data/satuan";
import DataJenis from "./../../../data/jenis";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const [variant, setVariant] = useState("");
  const [variantData, setVariantData] = useState({});
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceList, setPriceList] = useState([
    { unit: "", weight: "", price: "" },
  ]);

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeCategoryData = e => {
    setCategoryData(e.target.value);
  };
  const onChangeVarianData = e => {
    setVariantData(e.target.value);
  };

  const onChangePriceList = (e, idx) => {
    const { value, name } = e.target;
    console.log("value", value);
    console.log("name", name);
    setPriceList(oldState => {
      const state = [...oldState];
      state[idx] = {
        ...state[idx],
        [name]: value,
      };
      return state;
    });
  };
  console.log(priceList);

  const addMultiple = () => {
    const data = { unit: "", weight: "", price: "" };
    setPriceList(oldState => [...oldState, data]);
  };

  const deleteMultiple = idx => {
    const oldState = [...priceList];
    oldState.splice(idx, 1);
    setPriceList(oldState);
  };

  const onChangeDesc = e => {
    setDesc(e.target.value);
  };
  const onChangeImg = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSave = () => {
    const payload = {
      name: name,
      category_id: categoryData,
      variant_id: variantData,
      description: desc,
      priceList: priceList,
      image: image,
    };
    console.log(payload);
  };

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
                    <Col className="mx-auto col-8">
                      <Form>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeName}
                            placeholder="Enter product Name"
                          />
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Category
                          </Label>
                          <select
                            className="form-select"
                            onChange={onChangeCategoryData}
                          >
                            <option>Select</option>
                            <option>Category select</option>
                            <option>Category select</option>
                          </select>
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Variant
                          </Label>
                          <select
                            className="form-select"
                            onChange={onChangeVarianData}
                          >
                            <option>Select</option>
                            <option>Variant select</option>
                            <option>Variant select</option>
                          </select>
                        </div>
                        {priceList.map((m, idx) => {
                          return (
                            <Row key={idx}>
                              <Col className="mx-auto">
                                <div className="mb-3 me-2 ">
                                  <Label htmlFor="formrow-firstname-Input">
                                    Jenis
                                  </Label>
                                  <select
                                    className="form-select"
                                    onChange={e => onChangePriceList(e, idx)}
                                    name="unit"
                                  >
                                    {DataJenis.map((s, idx) => {
                                      return (
                                        <option value={s.kode} key={idx}>
                                          {s.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </Col>
                              <Col className="mx-auto ">
                                <div className="mb-3 me-2 ">
                                  <Label htmlFor="formrow-firstname-Input">
                                    Satuan
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    placeholder="Enter satuan"
                                    onChange={e => onChangePriceList(e, idx)}
                                    name="weight"
                                  />
                                </div>
                              </Col>
                              <Col className="mx-auto ">
                                <div className="mb-3 ">
                                  <Label htmlFor="formrow-firstname-Input">
                                    Harga
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-Input"
                                    placeholder="Enter price"
                                    onChange={e => onChangePriceList(e, idx)}
                                    name="price"
                                  />
                                </div>
                              </Col>

                              <Col className="mx-auto col-2 text-end">
                                <Label htmlFor="formrow-firstname-Input ">
                                  Action
                                </Label>
                                {idx === 0 ? (
                                  <div
                                    className="mb-3 mt-1 row"
                                    onClick={addMultiple}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i className="fas fa-plus-circle fs-3 text-end " />
                                  </div>
                                ) : (
                                  <div
                                    className="mb-3 mt-1 row"
                                    onClick={() => deleteMultiple(idx)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i className="fas fa-minus-circle fs-3 text-end text-danger" />
                                  </div>
                                )}
                              </Col>
                            </Row>
                          );
                        })}
                        <div className="mb-3 ">
                          <Label>Description</Label>

                          <Input
                            type="textarea"
                            id="textarea"
                            // maxLength="225"
                            rows="4"
                            placeholder="desc max 255 char"
                            onChange={onChangeDesc}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="input-group">
                            <Input
                              type="file"
                              className="form-control"
                              id="inputGroupFile02"
                              onChange={onChangeImg}
                            />
                            <Label
                              className="input-group-text"
                              htmlFor="inputGroupFile02"
                            >
                              Upload
                            </Label>
                          </div>
                        </div>
                        <Col>
                          <div className="text-sm-end">
                            <Link
                              to="/master/product"
                              className="btn btn-danger"
                            >
                              cancel
                            </Link>
                            <Button
                              type="button"
                              color="primary"
                              className=" mx-2 "
                              disabled={isLoading === true}
                              onClick={handleSave}
                            >
                              save
                            </Button>
                          </div>
                        </Col>
                      </Form>
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
