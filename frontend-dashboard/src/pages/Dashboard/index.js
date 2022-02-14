import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import classNames from "classnames";

const Dashboard = () => {
  // const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("weekly");

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Sao</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col xl="6">
              <Card>
                <CardBody>
                  <div className="d-sm-flex flex-wrap">
                    <h4 className="card-title mb-4">Grafik</h4>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col xl="6">
              <Card>
                <CardBody>
                  <div className="">
                    <h4 className="card-title mb-4">
                      Grafik Total Penjualan Setiap Produk
                    </h4>
                    <div className="">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "weekly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("weekly");
                            }}
                            id="one_month"
                          >
                            Week
                          </Link>{" "}
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "monthly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("monthly");
                            }}
                            id="one_month"
                          >
                            Month
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="#"
                            className={classNames(
                              { active: periodType === "yearly" },
                              "nav-link"
                            )}
                            onClick={() => {
                              onChangeChartPeriod("yearly");
                            }}
                            id="one_month"
                          >
                            Year
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  {/* <StackedColumnChart periodData={periodData} /> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
