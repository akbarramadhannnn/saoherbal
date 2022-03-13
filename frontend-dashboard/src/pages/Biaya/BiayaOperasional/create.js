import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const CreateBiayaOperasional = () => {
  const selectorAuth = useSelector(({ Auth }) => Auth);
  const position = selectorAuth.user.position;

  return (
    <div className="page-content">
      <MetaTags>
        <title>Tambah Biaya Operasional | SAO Herbal</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Biaya" breadcrumbItem="Tambah Biaya Operasional" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-4">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    Create Biaya Operasional
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

export default CreateBiayaOperasional;
