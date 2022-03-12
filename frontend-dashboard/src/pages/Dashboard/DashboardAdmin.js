import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import DataTransactionType from "../../data/transactionType";
import { ListMonth } from "../../data/periodeTime";
import { ApiGetTransactionTotalSaleProduct } from "../../api/transaction";
import { ReplaceToStartUpperCase } from "../../utils/replace";
import classNames from "classnames";
import ReactApexChart from "react-apexcharts";

import classnames from "classnames";

const Dashboard = () => {
  // const [periodData, setPeriodData] = useState([]);
  // const [options, setOptions] = useState({
  //   chart: {
  //     toolbar: {
  //       show: false,
  //     },
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       columnWidth: "45%",
  //       endingShape: "rounded",
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     show: true,
  //     width: 2,
  //     colors: ["transparent"],
  //   },
  //   colors: ["#34c38f", "#556ee6", "#f46a6a"],
  //   xaxis: {
  //     categories: [],
  //   },
  //   yaxis: {
  //     title: {
  //       text: "Grafik Jumlah Total Transaksi Produk",
  //     },
  //   },
  //   grid: {
  //     borderColor: "#f1f1f1",
  //   },
  //   fill: {
  //     opacity: 1,
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: function (val) {
  //         return val + " Barang";
  //       },
  //     },
  //   },
  // });
  const [periodType, setPeriodType] = useState("monthly");
  const [selectedPeriodMonth, setSelectedPeriodMonth] = useState("0");
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
    colors: ["#34c38f", "#556ee6", "#f46a6a"],
    dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    grid: {
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: [],
      // title: { text: "Month" },
    },
    yaxis: {
      title: {
        text: "Grafik Jumlah Total Transaksi Produk",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  });

  const reports = [
    {
      title: "Total Transaksi",
      iconClass: "bx-copy-alt",
      description: "1,235",
    },
    { title: "Total Karyawan", iconClass: "bx-user", description: "1,235" },
  ];

  useEffect(() => {
    if (selectedPeriodMonth) {
      handleGetDataChart(periodType, "2022", selectedPeriodMonth);
    }
  }, [selectedPeriodMonth, periodType]);

  const handleChangeInput = useCallback(e => {
    let { name, value } = e.target;

    if (name === "periodType") {
      setPeriodType(value);
    } else if (name === "periodeMonth") {
      setSelectedPeriodMonth(value);
    }
  }, []);

  const handleGetDataChart = useCallback((periodType, years, month) => {
    ApiGetTransactionTotalSaleProduct(periodType, years, month).then(
      response => {
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
      }
    );
  }, []);

  const series2 = [
    { name: "High - 2018", data: [26, 24, 32, 36, 33, 31, 33] },
    { name: "Low - 2018", data: [14, 11, 16, 12, 60, 13, 12] },
  ];
  const options2 = {
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
    colors: ["#556ee6", "#34c38f"],
    dataLabels: { enabled: !0 },
    stroke: { width: [3, 3], curve: "straight" },
    // title: { text: "Average High & Low Temperature", align: "left" },
    grid: {
      borderColor: "#f1f1f1",
    },
    markers: { style: "inverted", size: 6 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      // title: { text: "Month" },
    },
    yaxis: {
      title: {
        text: "Grafik Jumlah Total Transaksi Produk",
      },
    },
    responsive: [
      {
        breakpoint: 600,
        options: { chart: { toolbar: { show: !1 } }, legend: { show: !1 } },
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | SAO Herbal</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col xl="12">
              <Row>
                {reports.map((report, key) => (
                  <Col md="6" key={"_col_" + key}>
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
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <Label>Tipe Periode</Label>
                        <select
                          value={periodType}
                          name="periodType"
                          className="form-select"
                          onChange={handleChangeInput}
                        >
                          <option value="monthly">Bulanan</option>
                          <option value="yearly">Tahunan</option>
                        </select>
                      </div>
                      <div className="col-md-3 mb-3">
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
                    </div>
                  </div>
                  <div className="clearfix"></div>

                  {series.length > 0 && (
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="line"
                      height={350}
                    />
                  )}
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
