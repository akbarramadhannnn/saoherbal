import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Col, Card, CardBody, Label } from "reactstrap";
import DataTransactionType from "../../data/transactionType";
import { ListMonth } from "../../data/periodeTime";
import { ApiGetTransactionTotalSaleProduct } from "../../api/transaction";
import { ReplaceToStartUpperCase } from "../../utils/replace";
import classNames from "classnames";
import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  // const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("monthly");
  const [selectedPeriodMonth, setSelectedPeriodMonth] = useState("0");
  const [transactionType, setTransactionType] = useState("");
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
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
      categories: [],
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
  });
  useEffect(() => {
    // setTransactionType(DataTransactionType[0]);
    if (selectedPeriodMonth) {
      handleGetDataChart("2022", selectedPeriodMonth);
    }
  }, [selectedPeriodMonth]);

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

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
  };

  const handleChangeInput = useCallback(e => {
    let { name, value } = e.target;

    if (name === "transactionType") {
      setTransactionType(value);
    } else if (name === "periodType") {
      setPeriodType(value);
    } else if (name === "periodeMonth") {
      setSelectedPeriodMonth(value);
    }
  }, []);

  const handleGetDataChart = useCallback((years, month) => {
    ApiGetTransactionTotalSaleProduct(years, month).then(response => {
      if (response) {
        if (response.status === 200) {
          setSeries(response.result.groups);
          setOptions(oldState => ({
            ...oldState,
            xaxis: {
              ...oldState.xaxis,
              categories: response.result.listTime,
            },
          }));
        } else {
          setSeries([]);
          setOptions(oldState => ({
            ...oldState,
            xaxis: {
              ...oldState.xaxis,
              categories: response.result.listTime,
            },
          }));
        }
      }
    });
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
                          value={selectedPeriodMonth}
                          name="periodeMonth"
                          className="form-select"
                          onChange={handleChangeInput}
                        >
                          <option value="">Pilih Waktu Periode</option>
                          {ListMonth.map((d, i) => (
                            <option key={i} value={d.value}>
                              {d.label}
                            </option>
                          ))}
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
