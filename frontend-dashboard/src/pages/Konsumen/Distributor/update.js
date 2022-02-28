import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
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
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ModalMessage from "../../../components/Modal/ModalMessage";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

import { ApiGetListProvinsi, ApiGetListKabupaten } from "../../../api/wilayah";
import {
  ApiUpdateListDistributor,
  ApiDetailListDistributor,
} from "../../../api/distributor";

const Update = props => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;
  const id = props.match.params.id;
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
  const [coordinate, setCoordinate] = useState({
    longitude: {
      value: "",
      error: "",
    },
    latitude: {
      value: "",
      error: "",
    },
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    message: "",
    params: "",
  });

  useEffect(() => {
    setIsLoadingData(true);
    ApiDetailListDistributor(id).then(response => {
      if (response) {
        if (response.status === 200) {
          setName(response.result.name);
          setTlp(response.result.no_tlp);
          setEmail(response.result.email);
          setProvinsi(response.result.distributor_prov_id);
          setKabupaten(response.result.distributor_kab_id);
          setAlamat(response.result.address);
          setCoordinate(oldState => ({
            ...oldState,
            latitude: {
              ...oldState.latitude,
              value: response.result.latitude,
            },
            longitude: {
              ...oldState.longitude,
              value: response.result.longitude,
            },
          }));
        }
        setIsLoadingData(false);
      }
    });
  }, [id]);

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

  const onChangeCoordinate = useCallback(e => {
    const { name, value } = e.target;

    if (name === "longitude") {
      setCoordinate(oldState => ({
        ...oldState,
        longitude: {
          value: value,
          error: "",
        },
      }));
    } else if (name === "latitude") {
      setCoordinate(oldState => ({
        ...oldState,
        latitude: {
          value: value,
          error: "",
        },
      }));
    }
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
      latitude: coordinate.latitude.value,
      longitude: coordinate.longitude.value,
    };
    ApiUpdateListDistributor(id, payload).then(response => {
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
          } else if (response.result.name === "latitude") {
            setCoordinate(oldState => ({
              ...oldState,
              latitude: {
                ...oldState.latitude,
                error: response.message,
              },
            }));
          } else if (response.result.name === "longitude") {
            setCoordinate(oldState => ({
              ...oldState,
              longitude: {
                ...oldState.longitude,
                error: response.message,
              },
            }));
          }
        } else if (response.status === 201) {
          setModalMessage({
            isOpen: true,
            message: response.message,
            params: "success",
          });
        }
      }
      setIsDisabled(false);
    });
  }, [id, name, email, tlp, provinsi, kabupaten, alamat, coordinate]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Distributor</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Edit" breadcrumbItem="Distributor" />

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
                    <Row>
                      <Col className="mx-auto col-10">
                        <Form>
                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              Name
                            </Label>
                            <Input
                              value={name}
                              type="text"
                              className="form-control"
                              id="formrow-firstname-Input"
                              onChange={onChangeName}
                              placeholder="inputkan nama distributor"
                            />
                            {errorName && (
                              <p className="text-danger">{errorName}</p>
                            )}
                          </div>
                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              Email
                            </Label>
                            <Input
                              value={email}
                              type="text"
                              className="form-control"
                              id="formrow-firstname-Input"
                              onChange={onChangeEmail}
                              placeholder="inputkan email"
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
                              placeholder="inputkan nomor telepon"
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
                              <option value="">Pilih Provinsi</option>
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
                              <option value="">Pilih Kabupaten</option>
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
                              placeholder="inputkan alamat"
                              onChange={onChangeAlamat}
                            />
                            {errorAlamat && (
                              <p className="text-danger">{errorAlamat}</p>
                            )}
                          </div>

                          <div className="mb-3">
                            <Label>Kordinat Maps</Label>
                            <Row>
                              <Col md="6" className="mb-3">
                                <p className="p-0 m-0 mb-1 text-secondary">
                                  Latitude
                                </p>
                                <Input
                                  value={coordinate.latitude.value}
                                  type="text"
                                  name="latitude"
                                  placeholder="ex: -8.1980306"
                                  onChange={onChangeCoordinate}
                                />
                                {coordinate.latitude.error && (
                                  <p className="text-danger">
                                    {coordinate.latitude.error}
                                  </p>
                                )}
                              </Col>
                              <Col md="6" className="mb-3">
                                <p className="p-0 m-0 mb-1 text-secondary">
                                  Longitude
                                </p>
                                <Input
                                  value={coordinate.longitude.value}
                                  type="text"
                                  name="longitude"
                                  placeholder="ex: 110.7102276"
                                  onChange={onChangeCoordinate}
                                />
                                {coordinate.longitude.error && (
                                  <p className="text-danger">
                                    {coordinate.longitude.error}
                                  </p>
                                )}
                              </Col>
                            </Row>
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
                            }/konsumen/distributor`}
                            className="btn btn-danger me-2"
                          >
                            <i className="fas fa-arrow-left"></i> Kembali
                          </Link>
                          <Button
                            type="button"
                            color="primary"
                            disabled={isDisabled}
                            onClick={handleSave}
                          >
                            <i className="fas fa-save"></i> Simpan
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
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
    </React.Fragment>
  );
};

Update.propTypes = {
  match: PropTypes.object,
};

export default Update;
