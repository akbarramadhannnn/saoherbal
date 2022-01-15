import React, { Component, useState } from "react";
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
import { MetaTags } from "react-meta-tags";
import { Link } from "react-router-dom";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>variant</title>
        </MetaTags>
        <div className="container-fluid">
          <Breadcrumbs title="Create" breadcrumbItem="variant" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Row>
                    <Col className="mx-auto col-8">
                      <Form>
                        <div className="mb-3">
                          <Label htmlFor="formrow-firstname-Input">Name</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-firstname-Input"
                            placeholder="Enter variant Name"
                          />
                        </div>
                        {/* <div className="mb-3 ">
                          <Label htmlFor="formrow-firstname-Input">
                            Category
                          </Label>
                          <select className="form-select">
                            <option>Select</option>
                            <option>Category select</option>
                            <option>Category select</option>
                          </select>
                        </div> */}
                      </Form>
                    </Col>

                    <Col sm="10">
                      <div className="text-sm-end">
                        <Link to="/master/variant">
                          <Button
                            type="button"
                            color="danger"
                            className=" mb-2 me-2"
                            // onClick={this.handleOrderClicks}
                          >
                            cancel
                          </Button>
                        </Link>
                        <Button
                          type="button"
                          color="primary"
                          className=" mb-2 me-2"
                          // onClick={this.handleOrderClicks}
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
