import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import classNames from "classnames";

const Dashboard = () => {
  const reports = [
    { title: "Total Transaksi", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Total Karyawan", iconClass: "bx-user", description: "1,235" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];
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
            <Col xl="12">
              <Row>
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xl="12">
              <Card>
                <CardBody>
                  <div className="">
                    <h4 className="card-title mb-4">Grafik Transaksi</h4>
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

            <Col xl="12">
              <Card>
                <CardBody>
                  <div className="">
                    <h4 className="card-title mb-4">
                      Grafik Penjualan Per Produk
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
