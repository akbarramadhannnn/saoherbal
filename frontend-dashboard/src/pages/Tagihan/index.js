import React, { useEffect, useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row, Badge } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Table from "../../components/Table";
import MetaTags from "react-meta-tags";
import moment from "../../lib/moment";

import { ApiGetListBill } from "../../api/bill";

const Index = ({ history }) => {
  const [dataBillEngineer, setDataBillEngineer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickDetailTagihan = useCallback(
    billNumber => {
      history.push(`/tagihan/detail/${billNumber}`);
    },
    [history]
  );

  useEffect(() => {
    setIsLoading(true);
    ApiGetListBill("engineer").then(response => {
      if (response) {
        const dataArr = [];
        if (response.status === 200) {
          for (let i = 0; i < response.result.length; i++) {
            dataArr.push({
              billNumber: response.result[i].bill_number,
              bulanTanggal: `${moment(response.result[i].first_day).format(
                "LL"
              )} - ${moment(response.result[i].last_day).format("LL")}`,
              paymentStatus: (
                <Fragment>
                  {response.result[i].payment_status === "0" ? (
                    "-"
                  ) : (
                    <Badge
                      color={
                        response.result[i].payment_status === "1"
                          ? "danger"
                          : response.result[i].payment_status === "2"
                          ? "warning"
                          : response.result[i].payment_status === "3" &&
                            "success"
                      }
                      className="p-2"
                    >
                      {response.result[i].payment_status === "1" &&
                        "Belum Bayar"}
                      {response.result[i].payment_status === "2" &&
                        "Menunggu Konfirmasi"}
                      {response.result[i].payment_status === "3" &&
                        "Pembayaran Telah Selesai"}
                    </Badge>
                  )}
                </Fragment>
              ),
              actions: [
                {
                  iconClassName: "bx bx-wallet font-size-20",
                  actClassName: "text-primary",
                  text: "",
                  onClick: () => {
                    handleClickDetailTagihan(response.result[i].bill_number);
                  },
                },
              ],
            });
          }
          setDataBillEngineer(dataArr);
        } else if (response.status === 204) {
          setDataBillEngineer(dataArr);
        }
      }
      setIsLoading(false);
    });
  }, [handleClickDetailTagihan]);

  const listCol = [
    "col-4",
    "col-5",
    "col-3",
    "col-3",
  ];

  return (
    <div className="page-content">
      <MetaTags>
        <title>Tagihan</title>
      </MetaTags>
      <div className="container-fluid">
        <Breadcrumbs title="Tagihan" breadcrumbItem="Tagihan" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col xl="12">
                    <Table
                      column={[
                        "No Tagihan",
                        "Tanggal / Bulan",
                        "Status Pembayaran",
                        "Actions",
                      ]}
                      row={dataBillEngineer}
                      isLoading={isLoading}
                      col={isLoading ? [] : listCol}
                    />
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

Index.propTypes = {
  history: PropTypes.object,
};

export default Index;
