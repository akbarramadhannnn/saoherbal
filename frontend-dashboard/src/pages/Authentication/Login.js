import React, { useState, useCallback, useEffect } from "react";
import { Card, CardBody, Col, Container, Row, Label, Input } from "reactstrap";

import { Link } from "react-router-dom";

import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

import { HandleLogin, HandleLoadUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { LOAD_USER } from "../../store/auth/actionsTypes";

import Alert from "../../components/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (username && password) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [username, password]);

  const handleChangeInput = useCallback(e => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      setErrorUsername("");
    } else if (name === "password") {
      setPassword(value);
      setErrorPassword("");
    }
  }, []);

  const handleSubmit = useCallback(() => {
    setDisabledButton(true);
    const payload = {
      username,
      password,
    };
    HandleLogin(payload).then(responseLogin => {
      if (responseLogin) {
        if (responseLogin.status === 400) {
          if (responseLogin.result.name === "username") {
            setErrorUsername(responseLogin.message);
          } else if (responseLogin.result.name === "password") {
            setErrorPassword(responseLogin.message);
          } else if (responseLogin.result.name === "user") {
            setAlert(oldState => ({
              ...oldState,
              isOpen: true,
              title: "Login Failed!",
              message: responseLogin.message,
            }));
          }
          setDisabledButton(false);
        } else if (responseLogin.status === 200) {
          localStorage.setItem("token", responseLogin.result.token);
          HandleLoadUser().then(responseLoadUser => {
            if (responseLoadUser) {
              if (responseLoadUser.status === 200) {
                dispatch({
                  type: LOAD_USER,
                  payload: {
                    isAuth: true,
                    user: responseLoadUser.result,
                  },
                });
              }
            }
          });
        }
      }
    });
  }, [username, password, dispatch]);

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <div className="bg-primary bg-soft">
                <Row>
                  <Col className="col-7">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Selamat Datang !</h5>
                      <p>Silahkan Login Kembali</p>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end">
                    <img src={profile} alt="profile" className="img-fluid" />
                  </Col>
                </Row>
              </div>

              <CardBody className="pt-0">
                <div className="auth-logo">
                  <Link to="/" className="auth-logo-light">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={lightlogo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                  </Link>
                  <Link to="/" className="auth-logo-dark">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                  </Link>
                </div>

                <Alert
                  isOpen={alert.isOpen}
                  title={alert.title}
                  message={alert.message}
                  color="danger"
                  toggle={() => {
                    setAlert(oldState => ({
                      ...oldState,
                      isOpen: false,
                      title: "",
                      message: "",
                    }));
                  }}
                />

                <div className="p-2">
                  <div className="mb-3">
                    <Label className="form-label">Username</Label>
                    <Input
                      type="text"
                      name="username"
                      value={username}
                      placeholder="Masukkan username"
                      onChange={handleChangeInput}
                    />
                    {errorUsername && (
                      <p className="text-danger">{errorUsername}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Masukkan password"
                      onChange={handleChangeInput}
                    />
                    {errorPassword && (
                      <p className="text-danger">{errorPassword}</p>
                    )}
                  </div>

                  <div className="mt-3 d-grid">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={disabledButton}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
