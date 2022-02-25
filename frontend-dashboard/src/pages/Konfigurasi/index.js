import React, { useCallback, useEffect, useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Nav,
  NavItem,
  NavLink,
  Spinner,
  Label,
  Input,
} from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import Modal from "../../components/Modal";
import ModalMessage from "./../../components/Modal/ModalMessage";

import classnames from "classnames";

import {
  ApiGetListConfigure,
  ApiGetListConfigureDetail,
  ApiAddConfigure,
  ApiAddConfigureDetail,
} from "../../api/configure";

import { ReplaceToStartUpperCase } from "../../utils/replace";

const Index = () => {
  const [tabMenuConfigure, setTabMenuConfigure] = useState([]);
  const [listConfigureDetail, setListConfigureDetail] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState("");
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [modalAddConfigure, setModalAddConfigure] = useState({
    isOpen: false,
    title: "",
  });
  const [formAddModalConfigure, setFormAddModalConfigure] = useState({});
  const [modalAddConfigureDetail, setModalAddConfigureDetail] = useState({
    isOpen: false,
    title: "",
  });
  const [formAddModalConfigureDetail, setFormAddModalConfigureDetail] =
    useState({});
  const [modalMessage, setModalMessage] = useState({
    isOpen: false,
    message: "",
    params: "",
  });
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    handleGetDataConfigure();
  }, []);

  const handleGetDataConfigure = useCallback(() => {
    ApiGetListConfigure().then(responseConfigure => {
      if (responseConfigure) {
        if (responseConfigure.status === 200) {
          handleGetDataConfigureDetail(
            responseConfigure.result.data[0].configure_id
          );
          for (let i = 0; i < responseConfigure.result.data.length; i++) {
            responseConfigure.result.data[i].module = ReplaceToStartUpperCase(
              responseConfigure.result.data[i].module
            );
          }
          setActiveTab(responseConfigure.result.data[0].configure_id);
          setTitle(responseConfigure.result.data[0].module);
          setTabMenuConfigure(responseConfigure.result.data);
        } else if (response.status === 204) {
          setTabMenuConfigure([]);
        }
        setIsLoadingMenu(false);
      }
    });
  }, []);

  const handleGetDataConfigureDetail = useCallback(configureId => {
    setIsLoadingContent(true);
    ApiGetListConfigureDetail(configureId).then(response => {
      if (response) {
        if (response.status === 200) {
          setListConfigureDetail(response.result.data);
        } else if (response.status === 204) {
          setListConfigureDetail([]);
        }
        setIsLoadingContent(false);
      }
    });
  }, []);

  const handleChangeTab = useCallback((configureId, title) => {
    setActiveTab(configureId);
    setTitle(title);
    handleGetDataConfigureDetail(configureId);
    setListConfigureDetail([]);
  }, []);

  const handleChangeInput = useCallback((e, index) => {
    const value = e.target.value;
    setListConfigureDetail(oldState => {
      const state = [...oldState];
      state[index].value = value;
      return state;
    });
  }, []);

  const handleShowModalAddConfigure = useCallback(() => {
    setFormAddModalConfigure({
      module: {
        value: "",
        error: "",
      },
      icon: {
        value: "",
        error: "",
      },
    });
    setModalAddConfigure({
      isOpen: true,
      title: "Tambah Konfigurasi",
    });
  }, []);

  const handleCloseModalConfigure = useCallback(() => {
    setModalAddConfigure({
      isOpen: false,
      title: "",
    });
    setFormAddModalConfigure({});
  }, []);

  const handleChangeModalConfigure = useCallback(e => {
    const { name, value } = e.target;
    if (name === "modul") {
      setFormAddModalConfigure(oldState => ({
        ...oldState,
        module: {
          ...oldState.module,
          value: value,
          error: "",
        },
      }));
    } else if (name === "icon") {
      setFormAddModalConfigure(oldState => ({
        ...oldState,
        icon: {
          ...oldState.icon,
          value: value,
          error: "",
        },
      }));
    }
  }, []);

  const handleSubmitAddConfigure = useCallback(() => {
    const module = formAddModalConfigure.module.value;
    const icon = formAddModalConfigure.icon.value;

    if (module === "") {
      setFormAddModalConfigure(oldState => ({
        ...oldState,
        module: {
          ...oldState.module,
          error: "Nama modul wajib diisi",
        },
      }));
    } else if (icon === "") {
      setFormAddModalConfigure(oldState => ({
        ...oldState,
        icon: {
          ...oldState.icon,
          error: "Nama icon wajib diisi",
        },
      }));
    } else {
      setIsDisabledButton(true);
      const payload = {
        module: module,
        icon: icon,
      };
      ApiAddConfigure(payload).then(response => {
        if (response) {
          if (response.status === 201) {
            handleCloseModalConfigure();
            setTabMenuConfigure(oldState => [
              ...oldState,
              response.result.data,
            ]);
            setModalMessage({
              isOpen: true,
              message: response.message,
              params: "success",
            });
            setIsDisabledButton(false);
          }
        }
      });
    }
  }, [formAddModalConfigure, handleCloseModalConfigure]);

  const handleShowModalAddConfigureDetail = useCallback(() => {
    setFormAddModalConfigureDetail({
      name: {
        value: "",
        error: "",
      },
      value: {
        value: "",
        error: "",
      },
      description: {
        value: "",
        error: "",
      },
    });
    setModalAddConfigureDetail({
      isOpen: true,
      title: "Tambah Konfigurasi Detail",
    });
  }, []);

  const handleCloseModalConfigureDetail = useCallback(() => {
    setModalAddConfigureDetail({
      isOpen: false,
      title: "",
    });
    setFormAddModalConfigureDetail({});
  }, []);

  const handleChangeModalConfigureDetail = useCallback(e => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        name: {
          ...oldState.name,
          value: value,
          error: "",
        },
      }));
    } else if (name === "value") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        value: {
          ...oldState.value,
          value: value,
          error: "",
        },
      }));
    } else if (name === "description") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        description: {
          ...oldState.description,
          value: value,
          error: "",
        },
      }));
    }
  }, []);

  const handleSubmitAddConfigureDetail = useCallback(() => {
    const name = formAddModalConfigureDetail.name.value;
    const value = formAddModalConfigureDetail.value.value;
    const description = formAddModalConfigureDetail.description.value;

    if (name === "") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        name: {
          ...oldState.name,
          error: "Nama wajib diisi",
        },
      }));
    } else if (value === "") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        value: {
          ...oldState.value,
          error: "Value wajib diisi",
        },
      }));
    } else if (description === "") {
      setFormAddModalConfigureDetail(oldState => ({
        ...oldState,
        description: {
          ...oldState.description,
          error: "Description wajib diisi",
        },
      }));
    } else {
      setIsDisabledButton(true);
      const payload = {
        configureId: activeTab,
        name,
        value,
        description,
      };
      ApiAddConfigureDetail(payload).then(response => {
        if (response) {
          if (response.status === 201) {
            handleCloseModalConfigureDetail();
            setListConfigureDetail(oldState => [
              ...oldState,
              response.result.data,
            ]);
            setModalMessage({
              isOpen: true,
              message: response.message,
              params: "success",
            });
            setIsDisabledButton(false);
          }
        }
      });
    }
  }, [
    formAddModalConfigureDetail,
    handleCloseModalConfigureDetail,
    activeTab,
    listConfigureDetail,
  ]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Konfigurasi | Sao</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Konfigurasi" />
          <Row>
            <Col md="4">
              <Card className="p-4">
                {isLoadingMenu && (
                  <div className="d-flex justify-content-center pt-5 pb-5 text-primary">
                    <Spinner />
                  </div>
                )}

                {!isLoadingMenu && (
                  <Fragment>
                    <Button
                      type="button"
                      color="primary"
                      className=""
                      onClick={handleShowModalAddConfigure}
                      block
                    >
                      <i className="fas fa-plus"></i> Tambah Modul
                    </Button>

                    <div className="configure-list mt-4">
                      {tabMenuConfigure.length > 0 && (
                        <Nav
                          tabs
                          className="nav-tabs-custom"
                          vertical
                          role="tablist"
                        >
                          {tabMenuConfigure.map((d, i) => (
                            <NavItem key={i}>
                              <NavLink
                                className={classnames({
                                  active: activeTab === d.configure_id,
                                })}
                                onClick={() => {
                                  handleChangeTab(d.configure_id, d.module);
                                }}
                              >
                                <i className={`${d.icon} me-2`}></i>
                                {d.module}
                              </NavLink>
                            </NavItem>
                          ))}
                        </Nav>
                      )}

                      {!tabMenuConfigure.length > 0 && (
                        <div className="d-flex justify-content-center pt-5 pb-5 text-danger">
                          Data Not Found
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </Card>
            </Col>

            <Col md="8">
              <Card className="p-4">
                {isLoadingContent && (
                  <div className="d-flex justify-content-center pt-5 pb-5 text-primary">
                    <Spinner />
                  </div>
                )}

                {!isLoadingContent && (
                  <Fragment>
                    {(tabMenuConfigure.length > 0 ||
                      listConfigureDetail.length > 0) && (
                      <Fragment>
                        <h4 className="card-title mb-3">{title}</h4>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={handleShowModalAddConfigureDetail}
                          >
                            <i className="fas fa-plus"></i> Tambah Kolom
                          </button>
                        </div>

                        <Row className="mt-3">
                          {listConfigureDetail.length > 0 && (
                            <Col md="12">
                              {listConfigureDetail.map((d, i) => (
                                <div className="mb-3" key={i}>
                                  <Label htmlFor="formrow-firstname-Input">
                                    {ReplaceToStartUpperCase(d.name)}
                                  </Label>
                                  <Input
                                    value={d.value}
                                    type="text"
                                    className="form-control"
                                    onChange={e => handleChangeInput(e, i)}
                                  />
                                </div>
                              ))}

                              <div className="d-flex justify-content-end mt-4">
                                <button
                                  className="btn btn-warning"
                                  onClick={() => {
                                    // setmodal(!modal);
                                  }}
                                >
                                  <i className="fas fa-save"></i> Simpan
                                  Perubahan
                                </button>
                              </div>
                            </Col>
                          )}
                        </Row>
                      </Fragment>
                    )}

                    {(!tabMenuConfigure.length > 0 ||
                      !listConfigureDetail.length > 0) && (
                      <div className="d-flex justify-content-center pt-5 pb-5 text-danger">
                        Data Not Found
                      </div>
                    )}
                  </Fragment>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {modalAddConfigure.isOpen && (
        <Modal
          isOpen={modalAddConfigure.isOpen}
          title={modalAddConfigure.title}
          onClose={handleCloseModalConfigure}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitAddConfigure}
          isDisabledButtonLeft={isDisabledButton}
          isDisabledButtonRight={isDisabledButton}
        >
          <div className="mb-3 ">
            <Label htmlFor="formrow-firstname-Input">Modul</Label>
            <Input
              type="text"
              name="modul"
              value={formAddModalConfigure.module.value}
              onChange={handleChangeModalConfigure}
              placeholder="inputkan nama modul"
            />
            {formAddModalConfigure.module.error && (
              <p className="text-danger">
                {formAddModalConfigure.module.error}
              </p>
            )}
          </div>

          <div className="mb-3 ">
            <Label htmlFor="formrow-firstname-Input">Icon</Label>
            <Input
              type="text"
              name="icon"
              value={formAddModalConfigure.icon.value}
              onChange={handleChangeModalConfigure}
              placeholder="inputkan nama icon"
            />
            {formAddModalConfigure.icon.error && (
              <p className="text-danger">{formAddModalConfigure.icon.error}</p>
            )}
          </div>
        </Modal>
      )}

      {modalAddConfigureDetail.isOpen && (
        <Modal
          isOpen={modalAddConfigureDetail.isOpen}
          title={modalAddConfigureDetail.title}
          onClose={handleCloseModalConfigureDetail}
          tetxButtonLeft="Batal"
          tetxButtonRight="Simpan"
          onSubmit={handleSubmitAddConfigureDetail}
          isDisabledButtonLeft={isDisabledButton}
          isDisabledButtonRight={isDisabledButton}
        >
          <div className="mb-3 ">
            <Label htmlFor="formrow-firstname-Input">Name</Label>
            <Input
              type="text"
              name="name"
              value={formAddModalConfigureDetail.name.value}
              onChange={handleChangeModalConfigureDetail}
              placeholder="inputkan nama"
            />
            {formAddModalConfigureDetail.name.error && (
              <p className="text-danger">
                {formAddModalConfigureDetail.name.error}
              </p>
            )}
          </div>

          <div className="mb-3 ">
            <Label htmlFor="formrow-firstname-Input">Value</Label>
            <Input
              type="text"
              name="value"
              value={formAddModalConfigureDetail.value.value}
              onChange={handleChangeModalConfigureDetail}
              placeholder="inputkan value"
            />
            {formAddModalConfigureDetail.value.error && (
              <p className="text-danger">
                {formAddModalConfigureDetail.value.error}
              </p>
            )}
          </div>

          <div className="mb-3 ">
            <Label htmlFor="formrow-firstname-Input">Deskripsi</Label>
            <Input
              type="text"
              name="description"
              value={formAddModalConfigureDetail.description.value}
              onChange={handleChangeModalConfigureDetail}
              placeholder="inputkan deskripsi"
            />
            {formAddModalConfigureDetail.description.error && (
              <p className="text-danger">
                {formAddModalConfigureDetail.description.error}
              </p>
            )}
          </div>
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
    </React.Fragment>
  );
};

export default Index;
