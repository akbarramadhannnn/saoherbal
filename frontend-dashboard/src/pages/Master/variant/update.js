import React, { useState, useCallback, useEffect } from "react";
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
import Breadcrumbs from "./../../../components/Common/Breadcrumb";
import Alert from "./../../../components/Alert";
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

import { ApiGetListCategory } from "../../../api/category";
import {
  ApiUpdateListVariant,
  ApiDetailListVariant,
} from "../../../api/variant";

const Update = props => {
  const id = props.match.params.id;
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [errorCategoryId, setErrorCategoryId] = useState("");
  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState("");
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    setIsLoadingData(true);
    ApiDetailListVariant(id).then(response => {
      if (response) {
        if (response.status === 200) {
          setCategoryId(response.result.variant_category_id);
          setName(response.result.name);
        }
        setIsLoadingData(false);
      }
    });
  }, [props]);

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
    const { value } = e.target;
    setCategoryId(Number(value));
    setErrorCategoryId("");
  }, []);

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
      category_id: categoryId,
      name: name,
    };
    setIsDisabledButton(true);
    ApiUpdateListVariant(id, payload).then(response => {
      if (response) {
        if (response.status === 400) {
          if (response.result.name === "category_id") {
            setErrorCategoryId(response.message);
          } else if (response.result.name === "name") {
            setErrorName(response.message);
          }
        } else if (response.status === 201) {
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
  }, [id, categoryId, name]);

  return (
    <div className="page-content">
      <MetaTags>
        <title>Update Varian | SAO Herbal</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Edit" breadcrumbItem="Varian" />

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
                          <select
                            value={categoryId}
                            className="form-select"
                            onChange={onChangeCategory}
                          >
                            <option value="">Pilih Kategori</option>
                            {dataCategory.map((category, i) => (
                              <option value={category.category_id} key={i}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errorCategoryId && (
                            <p className="text-danger">{errorCategoryId}</p>
                          )}
                        </div>

                        <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Nama Varian
                          </Label>
                          <Input
                            value={name}
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            onChange={handleChangeInput}
                            placeholder="inputkan nama varian"
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
                          to="/admin/master/variant"
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
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Update.propTypes = {
  match: PropTypes.object,
};

export default Update;
