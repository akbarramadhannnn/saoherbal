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
import jenisDataDummy from "./../../../data/jenis";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState({});
  const [variant, setVariant] = useState("");
  const [variantData, setVariantData] = useState({});
  const [jenis, setJenis] = useState("");
  const [jenisData, setJenisData] = useState("");
  const [satuan, setSatuan] = useState("");
  const [satuanData, setSatuanData] = useState("");
  const [harga, setHarga] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeCategoryData = e => {
    setCategoryData(e.target.value);
  };
  const onChangeVarianData = e => {
    setVarianData(e.target.value);
  };
  const onChangeSatuanData = e => {
    setSatuanData(e.target.value);
  };
  const onChangeHarga = e => {
    setHarga(e.target.value);
  };
  const onChangeDesc = e => {
    setDesc(e.target.value);
  };
  const onChangeImg = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
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
                            onChange={name}
                            placeholder="Enter product Name"
                          />
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Category
                          </Label>
                          <select className="form-select">
                            <option>Select</option>
                            <option>Category select</option>
                            <option>Category select</option>
                          </select>
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Variant
                          </Label>
                          <select className="form-select">
                            <option>Select</option>
                            <option>Variant select</option>
                            <option>Variant select</option>
                          </select>
                        </div>
                        <Row>
                          <Col className="mx-auto">
                            <div className="mb-3 me-2 ">
                              <Label htmlFor="formrow-firstname-Input">
                                Jenis
                              </Label>
                              <select className="form-select">
                                {satuanDataDummy.map((s, idx) => {
                                  return <option key={idx}>{s.name}</option>;
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
                                type="number"
                                className="form-control"
                                id="formrow-firstname-Input"
                                placeholder="Enter satuan"
                              />
                              {/* <select className="form-select">
                                {jenisDataDummy.map((j, idx) => {
                                  return <option key={idx}>{j.name}</option>;
                                })}
                              </select> */}
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
                              />
                            </div>
                          </Col>
                          <Col className="mx-auto col-2 text-end">
                            <Label htmlFor="formrow-firstname-Input ">
                              Action
                            </Label>
                            <div className="mb-3 mt-1 row">
                              <i className="fas fa-plus-circle fs-3 text-end " />
                            </div>
                          </Col>
                        </Row>
                        <div className="mb-3 ">
                          <Label>Description</Label>

                          <Input
                            type="textarea"
                            id="textarea"
                            // maxLength="225"
                            rows="4"
                            placeholder="desc max 255 char"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="input-group">
                            <Input
                              type="file"
                              className="form-control"
                              id="inputGroupFile02"
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
                            <Link to="/master/product">
                              <Button
                                type="button"
                                color="danger"
                                className=" mb-2 me-2 "
                                // onClick={this.handleOrderClicks}
                              >
                                cancel
                              </Button>
                            </Link>
                            <Button
                              type="button"
                              color="primary"
                              className=" mb-2 "
                              disabled={isLoading === true}
                              // onClick={this.handleOrderClicks}
                            >
                              {isLoading ? "loading .." : "save"}
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
