import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Form,
  InputGroup,
  InputGroupText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Modal from "../../../components/Modal";
import ModalMessage from "../../../components/Modal/ModalMessage";
import Table from "../../../components/Table";
import Switch from "../../../components/Switch";
import InputSearch from "../../../components/Input/InputSearch";
import Pagination from "../../../components/Pagination";

import { Link } from "react-router-dom";

import {
  ApiGetListEmployee,
  ApiUpdateActiveEmployee,
} from "../../../api/employee";

import { ApiGetDetailAuth, ApiAddAuth, ApiUpdateAuth } from "../../../api/auth";

import moment from "../../../lib/moment";

const Index = ({ history }) => {
  const [isSubscribe, setIsSubscribe] = useState(true);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeActive, setEmployeeActive] = useState("");
  const [employeeIndex, setEmployeeIndex] = useState("");
  const [modalAuth, setModalAuth] = useState({
    isOpen: false,
    title: "",
    isLoading: true,
  });
  const [formAuth, setFormAuth] = useState({
    username: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  });
  const [passwordType, setPasswordType] = useState("password");
  const [authId, setAuthId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    message: "",
    params: "",
  });
  const [isDisabledButtonModal, setIsDisabledButtonModal] = useState(false);

  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalPage: 0,
    currentPage: 1,
    nextPage: 0,
    prevPage: 0,
  });

  useEffect(() => {
    return () => {
      setIsSubscribe(false);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (search || pagination.currentPage) {
      let timeout;
      timeout = setTimeout(() => {
        setIsSubscribe(true);
        handleGetData(search, pagination.currentPage);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      handleGetData();
    }
  }, [search, pagination.currentPage]);

  const handleChangeSearch = useCallback(e => {
    const { value } = e.target;
    setPagination({
      totalPage: 0,
      currentPage: 1,
      nextPage: 0,
      prevPage: 0,
    });
    setSearch(value);
  }, []);

  // const handleClickDelete = useCallback(id => {
  //   setModal(oldState => ({
  //     ...oldState,
  //     isOpen: true,
  //     title: "Confirmation",
  //     description: "Apakah anda yakin ingin menghapus data ini ?",
  //   }));
  //   setEmployeeId(id);
  // }, []);

  const handleClickUpdate = useCallback(
    id => {
      history.push(`/admin/master/employee/update/${id}`);
    },
    [history]
  );

  const handleToogleActive = useCallback((value, id, index) => {
    let active;
    if (value === "0") {
      active = "1";
    } else if (value === "1") {
      active = "0";
    }
    const payload = {
      active: active,
    };
    ApiUpdateActiveEmployee(id, payload).then(response => {
      if (response) {
        setEmployeeIndex(index);
        setEmployeeId(id);
        setEmployeeActive(active);
      }
    });
  }, []);

  const handleClickShowModalAuth = useCallback(id => {
    setModalAuth(oldState => ({
      ...oldState,
      isOpen: true,
    }));
    ApiGetDetailAuth(id).then(response => {
      if (response) {
        if (response.status === 204) {
          setModalAuth(oldState => ({
            ...oldState,
            title: "Add User Login",
            isLoading: false,
          }));
        } else if (response.status === 200) {
          setModalAuth(oldState => ({
            ...oldState,
            title: "Update User Login",
            isLoading: false,
          }));
          setFormAuth(oldState => ({
            ...oldState,
            username: {
              ...oldState.username,
              value: response.result.username,
            },
            password: {
              ...oldState.password,
              value: response.result.password_ori,
            },
          }));
          setAuthId(response.result.auth_id);
        }
        setEmployeeId(id);
      }
    });
  }, []);

  const handleClickHideModalAuth = useCallback(() => {
    setModalAuth(oldState => ({
      ...oldState,
      isOpen: false,
      title: "",
      isLoading: true,
    }));
    setEmployeeId("");
    setPasswordType("password");
    setFormAuth({
      username: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
    });
    setAuthId("");
    setIsDisabledButtonModal(false);
  }, []);

  useEffect(() => {
    if (employeeActive) {
      const state = [...dataEmployee];
      state[employeeIndex].active = (
        <Switch
          onColor="#38a4f8"
          isChecked={employeeActive === "1" ? true : false}
          onChange={() =>
            handleToogleActive(employeeActive, employeeId, employeeIndex)
          }
          unCheckedText="No"
          checkedText="Yes"
        />
      );
      setDataEmployee(state);
      setEmployeeIndex("");
      setEmployeeId("");
      setEmployeeActive("");
    }
  }, [dataEmployee, employeeActive, employeeId, employeeIndex]);

  const handleGetData = useCallback(
    (search, page) => {
      if (isSubscribe) {
        ApiGetListEmployee(search, page).then(response => {
          if (response) {
            const dataArr = [];
            if (response.status === 200) {
              for (let i = 0; i < response.result.data.length; i++) {
                dataArr.push({
                  nik: response.result.data[i].nik,
                  name: response.result.data[i].name,
                  position:
                    response.result.data[i].position === "2" ? "Sales" : "",
                  gender:
                    response.result.data[i].gender === "0"
                      ? "Laki - Laki"
                      : "Perempuan",
                  join_date: moment(response.result.data[i].join_date).format(
                    "Do MMMM YYYY"
                  ),
                  active: (
                    <Switch
                      onColor="#38a4f8"
                      isChecked={
                        response.result.data[i].active === "1" ? true : false
                      }
                      onChange={() =>
                        handleToogleActive(
                          response.result.data[i].active,
                          response.result.data[i].employee_id,
                          i
                        )
                      }
                      unCheckedText="No"
                      checkedText="Yes"
                    />
                  ),
                  created_at: moment(response.result.data[i].created_at).format(
                    "Do MMMM YYYY H:mm:ss"
                  ),
                  actions: (
                    <UncontrolledDropdown>
                      <DropdownToggle href="#" className="card-drop" tag="i">
                        <i
                          style={{ cursor: "pointer" }}
                          className="mdi mdi-dots-horizontal font-size-18"
                        />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem
                          onClick={() =>
                            handleClickUpdate(
                              response.result.data[i].employee_id
                            )
                          }
                        >
                          <i className="mdi mdi-pencil font-size-16 text-warning me-1" />{" "}
                          Edit Data
                        </DropdownItem>
                        <DropdownItem
                          onClick={() =>
                            handleClickShowModalAuth(
                              response.result.data[i].employee_id
                            )
                          }
                        >
                          <i className="mdi mdi-account-lock font-size-16 text-info me-1" />{" "}
                          Lihat Akun Login
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ),
                  // actions: [
                  //   {
                  //     iconClassName: "mdi mdi-pencil font-size-18",
                  //     actClassName: "text-warning",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickUpdate(response.result.data[i].employee_id);
                  //     },
                  //   },
                  //   {
                  //     iconClassName: "mdi mdi-account-lock font-size-18",
                  //     actClassName: "text-info",
                  //     text: "",
                  //     onClick: () => {
                  // handleClickShowModalAuth(
                  //   response.result.data[i].employee_id
                  // );
                  //     },
                  //   },
                  //   {
                  //     iconClassName: "mdi mdi-delete font-size-18",
                  //     actClassName: "text-danger",
                  //     text: "",
                  //     onClick: () => {
                  //       handleClickDelete(response.result[i].distributor_id);
                  //     },
                  //   },
                  // ],
                });
              }

              if (
                !response.result.pagination.next &&
                !response.result.pagination.prev
              ) {
                setPagination(oldState => ({
                  ...oldState,
                  totalPage: response.result.totalPage,
                }));
              } else {
                if (response.result.pagination.next) {
                  setPagination(oldState => ({
                    ...oldState,
                    nextPage: response.result.pagination.next.page,
                  }));
                } else {
                  setPagination(oldState => ({
                    ...oldState,
                    nextPage: 0,
                  }));
                }

                if (response.result.pagination.prev) {
                  setPagination(oldState => ({
                    ...oldState,
                    prevPage: response.result.pagination.prev.page,
                  }));
                } else {
                  setPagination(oldState => ({
                    ...oldState,
                    prevPage: 0,
                  }));
                }

                setPagination(oldState => ({
                  ...oldState,
                  totalPage: response.result.totalPage,
                }));
              }

              setDataEmployee(dataArr);
            } else if (response.status === 204) {
              setDataEmployee(dataArr);
            }
          }
          setIsLoading(false);
        });
      }
    },
    [
      handleClickUpdate,
      // handleClickDelete,
      handleToogleActive,
      handleClickShowModalAuth,
      isSubscribe,
    ]
  );

  const handleChangeFormAuth = useCallback(e => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormAuth(oldState => ({
        ...oldState,
        username: {
          ...oldState.username,
          value: value,
          error: "",
        },
      }));
    } else if (name === "password") {
      setFormAuth(oldState => ({
        ...oldState,
        password: {
          ...oldState.password,
          value: value,
          error: "",
        },
      }));
    }
  }, []);

  const handleShowHidePassword = useCallback(() => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  }, [passwordType]);

  const handleSubmitFormAuth = useCallback(() => {
    const payload = {
      employeeId: employeeId,
      username: formAuth.username.value,
      password: formAuth.password.value,
    };
    if (payload.username === "") {
      setFormAuth(oldState => ({
        ...oldState,
        username: {
          ...oldState.username,
          error: "Username is Required",
        },
      }));
    } else if (payload.password === "") {
      setFormAuth(oldState => ({
        ...oldState,
        password: {
          ...oldState.password,
          error: "Password is Required",
        },
      }));
    } else {
      setIsDisabledButtonModal(true);
      if (authId) {
        ApiUpdateAuth(authId, payload).then(response => {
          if (response) {
            if (response.status === 400) {
              if (response.result.name === "username") {
                setFormAuth(oldState => ({
                  ...oldState,
                  username: {
                    ...oldState.username,
                    error: response.message,
                  },
                }));
              }
            } else if (response.status === 201) {
              handleClickHideModalAuth();
              setModalMessage({
                isOpen: true,
                message: "Update User Login Successfully",
                params: "success",
              });
            }
          }
        });
      } else {
        ApiAddAuth(payload).then(response => {
          if (response) {
            if (response.status === 400) {
              if (response.result.name === "username") {
                setFormAuth(oldState => ({
                  ...oldState,
                  username: {
                    ...oldState.username,
                    error: response.message,
                  },
                }));
              }
            } else if (response.status === 201) {
              handleClickHideModalAuth();
              setModalMessage({
                isOpen: true,
                message: "Added User Login Successfully",
                params: "success",
              });
            }
          }
        });
      }
    }
  }, [formAuth, authId, employeeId, handleClickHideModalAuth]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Karyawan | SAO Herbal</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Karyawan" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/admin/master/employee/create"
                      className="btn btn-primary"
                    >
                      <i className="fas fa-plus"></i> Tambah Data Karyawan
                    </Link>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md="12">
                    <InputSearch
                      value={search}
                      onChange={handleChangeSearch}
                      placeholder="nama karyawan..."
                    />
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <Table
                      column={[
                        "NIK",
                        "Nama",
                        "Posisi",
                        "Jenis Kelamin",
                        "Tanggal Masuk",
                        "Aktif",
                        "Tanggal Dibuat",
                        "Aksi",
                      ]}
                      row={dataEmployee}
                      isLoading={isLoading}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Pagination
                    totalPage={pagination.totalPage}
                    currentPage={pagination.currentPage}
                    nextPage={pagination.nextPage}
                    prevPage={pagination.prevPage}
                    setPagination={setPagination}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {modalAuth.isOpen && (
        <Modal
          isOpen={modalAuth.isOpen}
          title={modalAuth.title}
          isLoading={modalAuth.isLoading}
          onClose={handleClickHideModalAuth}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitFormAuth}
          isDisabledButtonLeft={isDisabledButtonModal}
          isDisabledButtonRight={isDisabledButtonModal}
        >
          <Form>
            <div className="mb-3 ">
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={formAuth.username.value}
                onChange={handleChangeFormAuth}
                placeholder="Enter username"
              />
              {formAuth.username.error && (
                <p className="text-danger">{formAuth.username.error}</p>
              )}
            </div>

            <div className="mb-3 ">
              <Label>Password</Label>
              <InputGroup>
                <Input
                  type={passwordType}
                  name="password"
                  value={formAuth.password.value}
                  onChange={handleChangeFormAuth}
                  placeholder="Enter password"
                />
                <InputGroupText>
                  <div onClick={handleShowHidePassword}>
                    {passwordType === "password" && (
                      <i className="fas fa-eye-slash"></i>
                    )}
                    {passwordType === "text" && <i className="fas fa-eye"></i>}
                  </div>
                </InputGroupText>
              </InputGroup>

              {formAuth.password.error && (
                <p className="text-danger">{formAuth.password.error}</p>
              )}
            </div>
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
    </div>
  );
};

Index.propTypes = {
  history: PropTypes.object,
};

export default Index;
