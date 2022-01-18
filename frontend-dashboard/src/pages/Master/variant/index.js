import React from "react";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="page-content">
      <MetaTags>
        <title>Variant</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Master" breadcrumbItem="Variant" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link
                      to="/master/variant/create"
                      className="btn btn-primary"
                    >
                      Add New Variant
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Table heading</th>
                          <th>Table heading</th>
                          <th>Table heading</th>
                          <th>Table heading</th>
                          <th>Table heading</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Table cell</td>
                          <td>Table cell</td>
                          <td>Table cell</td>
                          <td>Table cell</td>
                          <td>Table cell</td>
                          <td>
                            <div className="d-flex gap-3">
                              <Link to="#" className="text-success">
                                <i
                                  className="mdi mdi-pencil font-size-18"
                                  id="edittooltip"
                                />
                              </Link>
                              <Link to="#" className="text-danger">
                                <i
                                  className="mdi mdi-delete font-size-18"
                                  id="deletetooltip"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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

export default Index;
