import React, { useState } from "react";
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
  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSave = () => {
    const payload = {
      name: name,
    };
    console.log(payload);
  };

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
                            className="form-control-lg"
                            id="formrow-firstname-Input"
                            placeholder="Enter variant Name"
                            onChange={handleChange}
                          />
                        </div>
                      </Form>
                    </Col>

                    <Col sm="10">
                      <div className="text-sm-end">
                        <Link to="/master/variant" className="btn btn-danger">
                          cancel
                        </Link>
                        <Button
                          type="button"
                          color="primary"
                          className=" mx-2"
                          onClick={handleSave}
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
