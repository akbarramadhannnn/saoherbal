import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody, Label } from "reactstrap";
import DataTransactionType from "../../data/transactionType";
import { ReplaceToStartUpperCase } from "../../utils/replace";
import classNames from "classnames";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  // const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("monthly");
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    setTransactionType(DataTransactionType[0]);
  }, []);

  const reports = [
    {
      title: "Total Transaksi",
      iconClass: "bx-copy-alt",
      description: "1,235",
    },
    { title: "Total Karyawan", iconClass: "bx-user", description: "1,235" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  const series = [
    {
      name: "Sao 1",
      data: [46, 57, 59, 54, 62, 58, 64, 60, 66, 10, 11, 12],
    },
    {
      name: "Sao 2",
      data: [74, 83, 102, 97, 86, 106, 93, 114, 94, 10, 11, 12],
    },
    {
      name: "Sao 3",
      data: [37, 42, 38, 26, 47, 50, 54, 55, 43, 10, 11, 12],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    xaxis: {
      categories: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    },
    yaxis: {
      title: {
        text: "Grafik Jumlah Total Transaksi Produk",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Barang";
        },
      },
    },
  };

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
  };

  const handleChangeInput = useCallback(e => {
    let { name, value } = e.target;

    if (name === "transactionType") {
      setTransactionType(value);
    } else if (name === "periodType") {
      setPeriodType(value);
    }
  }, []);

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
                    <h4 className="card-title mb-4">
                      Jumlah Total Transaksi Product
                    </h4>
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <Label>Jenis Transaksi</Label>
                        <select
                          name="transactionType"
                          value={transactionType}
                          className="form-select"
                          onChange={handleChangeInput}
                        >
                          {DataTransactionType.map((d, i) => (
                            <option key={i} value={d}>
                              {ReplaceToStartUpperCase(d)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <Label>Tipe Periode</Label>
                        <select
                          value={periodType}
                          name="periodType"
                          className="form-select"
                          onChange={() => {}}
                        >
                          <option value="monthly">Bulanan</option>
                          <option value="yearly">Tahunan</option>
                        </select>
                      </div>
                      <div className="col-md-3">
                        <Label>Waktu Periode</Label>
                        <select
                          value={""}
                          className="form-select"
                          onChange={() => {}}
                        >
                          <option value="">Pilih Waktu Periode</option>
                          <option value="monthly">Bulanan</option>
                          <option value="yearly">Tahunan</option>
                        </select>
                      </div>
                      {/* <ul className="nav nav-pills">
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
                            Bulanan
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
                            Tahunan
                          </Link>
                        </li>
                      </ul> */}
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                  />
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
