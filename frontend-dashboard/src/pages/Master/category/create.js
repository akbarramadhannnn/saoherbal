import React, { useState, useCallback } from "react";
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
} from "reactstrap";
import Breadcrumbs from "./../../../components/Common/Breadcrumb";
import Alert from "./../../../components/Alert";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

import { ApiAddListCategory } from "../../../api/category";

const Create = () => {
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleChangeInput = useCallback(e => {
    const { value } = e.target;
    setName(value);
    setErrorName("");
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
    const payload = {
      name: name,
    };
    setIsDisabledButton(true);
    ApiAddListCategory(payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "name") {
            setErrorName(response.message);
          }
        } else if (response.status === 201) {
          setName("");
          setAlert(oldState => ({
            ...oldState,
            isOpen: true,
            title: "Success",
            message: response.message,
          }));
        }
      }
      setIsDisabledButton(false);
    });
  }, [name]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Kategori</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Tambah" breadcrumbItem="Kategori" />

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
                        <Label htmlFor="formrow-firstname-Input">
                          Nama Kategori
                        </Label>
                        <Input
                          value={name}
                          type="text"
                          className="form-control"
                          id="formrow-firstname-Input"
                          onChange={handleChangeInput}
                          placeholder="inputkan nama kategori"
                        />
                        {errorName && (
                          <p className="text-danger">{errorName}</p>
                        )}
                      </div>
                    </Form>
                  </Col>

                  <Col className="mx-auto col-10">
                    <div className="d-flex justify-content-end">
                      <Link
                        to="/admin/master/category"
                        className="btn btn-danger mb-2 me-2"
                      >
                        <i className="fas fa-arrow-left"></i> Kembali
                      </Link>
                      <Button
                        type="button"
                        color="primary"
                        className="mb-2"
                        onClick={handleSave}
                        disabled={isDisabledButton}
                      >
                        <i className="fas fa-save"></i> Simpan
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
  );
};

export default Create;
