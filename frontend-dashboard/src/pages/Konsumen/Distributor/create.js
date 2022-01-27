import React, { useState, useEffect, useCallback } from "react";
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
import Alert from "./../../../components/Alert";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

import { ApiGetListProvinsi, ApiGetListKabupaten } from "../../../api/wilayah";
import { ApiAddListDistributor } from "../../../api/distributor";

const Create = () => {
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [tlp, setTlp] = useState("");
  const [errorTlp, setErrorTlp] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [errorProvinsi, setErrorProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [errorKabupaten, setErrorKabupaten] = useState("");
  const [alamat, setAlamat] = useState("");
  const [errorAlamat, setErrorAlamat] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    ApiGetListProvinsi().then(response => {
      if (response) {
        if (response.status === 200) {
          setDataProvinsi(response.result);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (provinsi) {
      ApiGetListKabupaten(provinsi).then(response => {
        if (response) {
          if (response.status === 200) {
            setDataKabupaten(response.result);
          }
        }
      });
    } else {
      setDataKabupaten([]);
    }
  }, [provinsi]);

  const onChangeName = useCallback(e => {
    setName(e.target.value);
    setErrorName("");
  }, []);

  const onChangeTlp = useCallback(e => {
    setTlp(e.target.value);
    setErrorTlp("");
  }, []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
    setErrorEmail("");
  }, []);

  const onChangeProvinsi = useCallback(e => {
    const { value } = e.target;
    setProvinsi(Number(value));
    setErrorProvinsi("");
  }, []);

  const onChangeKabupaten = useCallback(e => {
    const { value } = e.target;
    setKabupaten(Number(value));
    setErrorKabupaten("");
  }, []);

  const onChangeAlamat = useCallback(e => {
    setAlamat(e.target.value);
    setErrorAlamat("");
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
    setIsDisabled(true);
    const payload = {
      name: name,
      email: email,
      no_tlp: tlp,
      provinsi_id: provinsi,
      kabupaten_id: kabupaten,
      address: alamat,
    };
    ApiAddListDistributor(payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "name") {
            setErrorName(response.message);
          } else if (response.result.name === "email") {
            setErrorEmail(response.message);
          } else if (response.result.name === "no_tlp") {
            setErrorTlp(response.message);
          } else if (response.result.name === "provinsi_id") {
            setErrorProvinsi(response.message);
          } else if (response.result.name === "kabupaten_id") {
            setErrorKabupaten(response.message);
          } else if (response.result.name === "address") {
            setErrorAlamat(response.message);
          }
        } else if (response.status === 201) {
          setName("");
          setErrorName("");
          setTlp("");
          setErrorTlp("");
          setEmail("");
          setErrorEmail("");
          setProvinsi("");
          setErrorProvinsi("");
          setKabupaten("");
          setErrorKabupaten("");
          setAlamat("");
          setErrorAlamat("");
          setAlert(oldState => ({
            ...oldState,
            isOpen: true,
            title: "Success!",
            message: response.message,
          }));
        }
      }
      setIsDisabled(false);
    });
  }, [name, email, tlp, provinsi, kabupaten, alamat]);

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
                    <Col className="mx-auto col-10">
                      <Alert
                        isOpen={alert.isOpen}
                        title={alert.title}
                        message={alert.message}
                        color="success"
                        toggle={handleCloseAlert}
                      />
                      <Form>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">Name</Label>
                          <Input
                            value={name}
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeName}
                            placeholder="Enter distributor name"
                          />
                          {errorName && (
                            <p className="text-danger">{errorName}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">Email</Label>
                          <Input
                            value={email}
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeEmail}
                            placeholder="Enter email "
                          />
                          {errorEmail && (
                            <p className="text-danger">{errorEmail}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            No Telepon
                          </Label>
                          <Input
                            value={tlp}
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={onChangeTlp}
                            placeholder="Enter telepon "
                          />
                          {errorTlp && (
                            <p className="text-danger">{errorTlp}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Provinsi
                          </Label>
                          <select
                            value={provinsi}
                            className="form-select"
                            onChange={onChangeProvinsi}
                          >
                            <option value="">Select Provinsi</option>
                            {dataProvinsi.map((d, i) => (
                              <option key={i} value={d.provinsi_id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          {errorProvinsi && (
                            <p className="text-danger">{errorProvinsi}</p>
                          )}
                        </div>
                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Kabupaten
                          </Label>
                          <select
                            value={kabupaten}
                            className="form-select"
                            onChange={onChangeKabupaten}
                          >
                            <option value="">Select Kabupaten</option>
                            {dataKabupaten.map((d, i) => (
                              <option key={i} value={d.kabupaten_id}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          {errorKabupaten && (
                            <p className="text-danger">{errorKabupaten}</p>
                          )}
                        </div>

                        <div className="mb-3 ">
                          <Label>Alamat</Label>
                          <Input
                            value={alamat}
                            type="textarea"
                            id="textarea"
                            // maxLength="225"
                            rows="4"
                            placeholder="enter address"
                            onChange={onChangeAlamat}
                          />
                          {errorAlamat && (
                            <p className="text-danger">{errorAlamat}</p>
                          )}
                        </div>
                      </Form>
                    </Col>

                    <Col className="mx-auto col-10">
                      <div className="d-flex justify-content-end">
                        <Link
                          to="/konsumen/distributor"
                          className="btn btn-danger"
                        >
                          cancel
                        </Link>
                        <Button
                          type="button"
                          color="primary"
                          className=" mx-2 "
                          disabled={isDisabled}
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
