import React, { useState, useEffect, useCallback } from "react";
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
  FormGroup,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ModalMessage from "../../../components/Modal/ModalMessage";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

import { ApiGetListProvinsi, ApiGetListKabupaten } from "../../../api/wilayah";
import {
  ApiDetailListEmployee,
  ApiUpdateListEmployee,
} from "../../../api/employee";

import moment from "../../../lib/moment";

const Update = props => {
  const id = props.match.params.id;
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKabupaten, setDataKabupaten] = useState([]);
  const [numberId, setNumberId] = useState("");
  const [errorNumberId, setErrorNumberId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [errorTypeId, setErrorTypeId] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [tlp, setTlp] = useState("");
  const [errorTlp, setErrorTlp] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [gender, setGender] = useState("");
  const [errorGender, setErrorGender] = useState("");
  const [position, setPosition] = useState("");
  const [errorPosition, setErrorPosition] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [errorProvinsi, setErrorProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [errorKabupaten, setErrorKabupaten] = useState("");
  const [alamat, setAlamat] = useState("");
  const [errorAlamat, setErrorAlamat] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [errorJoinDate, setErrorJoinDate] = useState("");
  const [birth, setBirth] = useState({
    place: {
      value: "",
      error: "",
    },
    date: {
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
    ApiDetailListEmployee(id).then(response => {
      if (response) {
        if (response.status === 200) {
          setNumberId(response.result.number_id);
          setTypeId(response.result.type_id);
          setName(response.result.name);
          setTlp(response.result.no_tlp);
          setEmail(response.result.email);
          setGender(response.result.gender);
          setPosition(response.result.position);
          setProvinsi(response.result.provinsi_id_employee);
          setKabupaten(response.result.kabupaten_id_employee);
          setAlamat(response.result.address);
          setJoinDate(moment(response.result.join_date).format("YYYY-MM-DD"));
          setBirth(oldState => ({
            ...oldState,
            place: {
              ...oldState.place,
              value: response.result.place_of_birth,
            },
            date: {
              ...oldState.date,
              value: moment(response.result.birth_of_date).format("YYYY-MM-DD"),
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

  const onChangeTypeId = useCallback(e => {
    const { value } = e.target;
    setTypeId(value);
    setErrorTypeId("");
  }, []);

  const onChangeNumberId = useCallback(e => {
    setNumberId(e.target.value);
    setErrorNumberId("");
  }, []);

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

  const onChangeGender = useCallback(e => {
    const { value } = e.target;
    setGender(value);
    setErrorGender("");
  }, []);

  const onChangePosition = useCallback(e => {
    const { value } = e.target;
    setPosition(value);
    setErrorPosition("");
  }, []);

  const onChangeBirth = useCallback(e => {
    const { name, value } = e.target;

    if (name === "place") {
      setBirth(oldState => ({
        ...oldState,
        place: {
          value: value,
          error: "",
        },
      }));
    } else if (name === "date") {
      setBirth(oldState => ({
        ...oldState,
        date: {
          value: value,
          error: "",
        },
      }));
    }
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

  const onChangeJoinDate = useCallback(e => {
    const { value } = e.target;
    setJoinDate(value);
    setErrorJoinDate("");
  }, []);

  const handleSave = useCallback(() => {
    setIsDisabled(true);
    const payload = {
      typeId: typeId,
      numberId: numberId,
      name: name,
      email: email,
      gender: gender,
      placeOfDate: birth.place.value,
      birthOfDate: birth.date.value,
      position: position,
      noTlp: tlp,
      provinsiId: provinsi,
      kabupatenId: kabupaten,
      address: alamat,
      joinDate: joinDate,
    };
    ApiUpdateListEmployee(id, payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "typeId") {
            setErrorTypeId(response.message);
          } else if (response.result.name === "numberId") {
            setErrorNumberId(response.message);
          } else if (response.result.name === "name") {
            setErrorName(response.message);
          } else if (response.result.name === "email") {
            setErrorEmail(response.message);
          } else if (response.result.name === "gender") {
            setErrorGender(response.message);
          } else if (response.result.name === "placeOfDate") {
            setBirth(oldState => ({
              ...oldState,
              place: {
                ...oldState.place,
                error: response.message,
              },
            }));
          } else if (response.result.name === "birthOfDate") {
            setBirth(oldState => ({
              ...oldState,
              date: {
                ...oldState.date,
                error: response.message,
              },
            }));
          } else if (response.result.name === "position") {
            setErrorPosition(response.message);
          } else if (response.result.name === "noTlp") {
            setErrorTlp(response.message);
          } else if (response.result.name === "provinsi_id") {
            setErrorProvinsi(response.message);
          } else if (response.result.name === "kabupaten_id") {
            setErrorKabupaten(response.message);
          } else if (response.result.name === "address") {
            setErrorAlamat(response.message);
          } else if (response.result.name === "joinDate") {
            setErrorJoinDate(response.message);
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
  }, [
    id,
    typeId,
    numberId,
    name,
    gender,
    birth,
    email,
    tlp,
    position,
    provinsi,
    kabupaten,
    alamat,
    joinDate,
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Karyawan</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Update" breadcrumbItem="Karyawan" />

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
                              Tipe Identitas
                            </Label>
                            <Row>
                              <Col className="col-6 col-md-auto">
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      value="ktp"
                                      checked={typeId === "ktp"}
                                      onChange={onChangeTypeId}
                                    />{" "}
                                    KTP
                                  </Label>
                                </FormGroup>
                              </Col>

                              <Col className="col-6 col-md-auto">
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      value="sim a"
                                      checked={typeId === "sim a"}
                                      onChange={onChangeTypeId}
                                    />{" "}
                                    SIM A
                                  </Label>
                                </FormGroup>
                              </Col>

                              <Col md="auto">
                                <FormGroup check>
                                  <Label check>
                                    <Input
                                      type="radio"
                                      value="sim c"
                                      checked={typeId === "sim ac"}
                                      onChange={onChangeTypeId}
                                    />{" "}
                                    SIM C
                                  </Label>
                                </FormGroup>
                              </Col>

                              {errorTypeId && (
                                <p className="text-danger">{errorTypeId}</p>
                              )}
                            </Row>
                          </div>

                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              No Identitas
                            </Label>
                            <Input
                              value={numberId}
                              type="text"
                              className="form-control"
                              id="formrow-firstname-Input"
                              onChange={onChangeNumberId}
                              placeholder="inputkan no identitas"
                            />
                            {errorNumberId && (
                              <p className="text-danger">{errorNumberId}</p>
                            )}
                          </div>
                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              Nama
                            </Label>
                            <Input
                              value={name}
                              type="text"
                              className="form-control"
                              id="formrow-firstname-Input"
                              onChange={onChangeName}
                              placeholder="inputkan nama karyawan"
                            />
                            {errorName && (
                              <p className="text-danger">{errorName}</p>
                            )}
                          </div>
                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              Jenis Kelamin
                            </Label>
                            <select
                              value={gender}
                              className="form-select"
                              onChange={onChangeGender}
                            >
                              <option value="">Pilih Jenis Kelamin</option>
                              <option value="0">Laki - Laki</option>
                              <option value="1">Perempuan</option>
                            </select>
                            {errorGender && (
                              <p className="text-danger">{errorGender}</p>
                            )}
                          </div>
                          <div>
                            <Label>Tempat & Tanggal Lahir</Label>
                            <Row>
                              <Col md="6" className="mb-3">
                                <p className="p-0 m-0 mb-1 text-secondary">
                                  Tempat
                                </p>
                                <Input
                                  value={birth.place.value}
                                  type="text"
                                  name="place"
                                  placeholder="inputkan tempat lahir"
                                  onChange={onChangeBirth}
                                />
                                {birth.place.error && (
                                  <p className="text-danger">
                                    {birth.place.error}
                                  </p>
                                )}
                              </Col>
                              <Col md="6" className="mb-3">
                                <p className="p-0 m-0 mb-1 text-secondary">
                                  Tanggal Lahir
                                </p>
                                <Input
                                  value={birth.date.value}
                                  type="date"
                                  name="date"
                                  placeholder="inputkan tanggal lahir"
                                  onChange={onChangeBirth}
                                />
                                {birth.date.error && (
                                  <p className="text-danger">
                                    {birth.date.error}
                                  </p>
                                )}
                              </Col>
                            </Row>
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
                              placeholder="inputkan no telepon"
                            />
                            {errorTlp && (
                              <p className="text-danger">{errorTlp}</p>
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
                              Posisi / Jabatan
                            </Label>
                            <select
                              value={position}
                              className="form-select"
                              onChange={onChangePosition}
                            >
                              <option value="">Pilih Posisi</option>
                              <option value="2">Sales</option>
                            </select>
                            {errorPosition && (
                              <p className="text-danger">{errorPosition}</p>
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
                              placeholder="inputkan alamat tempat tinggal"
                              onChange={onChangeAlamat}
                            />
                            {errorAlamat && (
                              <p className="text-danger">{errorAlamat}</p>
                            )}
                          </div>

                          <div className="mb-3 ">
                            <Label htmlFor="formrow-firstname-Input">
                              Tanggal Bergabung
                            </Label>
                            <Input
                              value={joinDate}
                              type="date"
                              className="form-control"
                              onChange={onChangeJoinDate}
                              placeholder="inputkan tanggal bergabung"
                            />
                            {errorJoinDate && (
                              <p className="text-danger">{errorJoinDate}</p>
                            )}
                          </div>
                        </Form>
                      </Col>

                      <Col className="mx-auto col-10">
                        <div className="d-flex justify-content-end">
                          <Link
                            to="/admin/master/employee"
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
