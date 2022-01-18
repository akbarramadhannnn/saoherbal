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
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [tlp, setTlp] = useState("");
  const [email, setEmail] = useState("");
  const [provinsi, setProvinsi] = useState({});

  const [kabupaten, setKabupaten] = useState({});
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeTlp = e => {
    setTlp(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangeProvinsi = e => {
    setProvinsi(e.target.value);
  };
  const onChangeKabupaten = e => {
    setKabupaten(e.target.value);
  };

  const onChangeAlamat = e => {
    setAlamat(e.target.value);
  };

  const handleSave = () => {
    const payload = {
      name: name,
      email: email,
      no_tlp: tlp,
      provinsi_id: provinsi,
      kabupaten_id: kabupaten,
      alamat: alamat,
    };
    console.log(payload);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Distributor</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Create" breadcrumbItem="Distributor" />

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
                            placeholder="Enter distributor name"
                          />
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">Email</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeEmail}
                            placeholder="Enter email "
                          />
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            No Telepon
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeTlp}
                            placeholder="Enter telepon "
                          />
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Provinsi
                          </Label>
                          <select
                            className="form-select"
                            onChange={onChangeProvinsi}
                          >
                            <option>Select</option>
                            <option>DIY</option>
                            <option>Jawa Tengah</option>
                          </select>
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Kabupaten
                          </Label>
                          <select
                            className="form-select"
                            onChange={onChangeKabupaten}
                          >
                            <option>Select</option>
                            <option>Sleman</option>
                            <option>Bantul</option>
                          </select>
                        </div>

                        <div className="mb-3 ">
                          <Label>Alamat</Label>

                          <Input
                            type="textarea"
                            id="textarea"
                            // maxLength="225"
                            rows="4"
                            placeholder="alamat max 255 char"
                            onChange={onChangeAlamat}
                          />
                        </div>
                        <Col>
                          <div className="text-sm-end">
                            <Link to="/konsumen/distributor" className="btn btn-danger">
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
