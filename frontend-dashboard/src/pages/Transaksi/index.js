import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Row, Col, Card, CardBody } from "reactstrap";
import Table from "./../../components/Table";
import ModalLoading from "./../../components/Modal/ModalLoading";
import { ConvertToRupiah } from "./../../utils/convert";

import {
  ApiGetListTransaction,
  ApiDetailListTransaction,
} from "../../api/transaction";

import { ApiGeneratePdfInvoiceTransaction } from "../../api/file";

import moment from "../../lib/moment";

const Index = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleClickCetakTransaction = useCallback(code => {
    setIsModalLoading(true);
    ApiDetailListTransaction(code).then(response => {
      if (response) {
        if (response.status === 200) {
          const payload = {
            data: response.result,
          };
          ApiGeneratePdfInvoiceTransaction(payload).then(responseInvoice => {
            if (responseInvoice.status === 201) {
              let newwindow = window.open(`${responseInvoice.result.url}`);
              if (window.focus) {
                newwindow.focus();
              }
              setIsModalLoading(false);
            }
          });
        }
      }
    });
  }, []);

  const handleGetData = useCallback(() => {
    setIsLoading(true);
    ApiGetListTransaction().then(response => {
      if (response) {
        const dataArr = [];
        if (response.status === 200) {
          for (let i = 0; i < response.result.length; i++) {
            dataArr.push({
              code: response.result[i].code,
              consumerType: response.result[i].consumer_type,
              consumer: response.result[i].consumer.name,
              product: response.result[i].product.name,
              weightUnit: `${response.result[i].price.weight}/${response.result[i].price.unit}`,
              prices: `Rp ${ConvertToRupiah(response.result[i].price.prices)}`,
              qty: response.result[i].qty,
              subtotal: `Rp ${ConvertToRupiah(response.result[i].subtotal)}`,
              transactionDate: `${moment(
                response.result[i].date_transaction
              ).format("Do MMMM YYYY")} Pkl ${moment(
                response.result[i].date_transaction
              ).format("H:mm:ss")}`,
              actions: [
                {
                  iconClassName: "bx bxs-file-pdf font-size-20",
                  actClassName: "text-primary",
                  text: "",
                  onClick: () => {
                    handleClickCetakTransaction(response.result[i].code);
                  },
                },
              ],
            });
          }
          setDataTransaction(dataArr);
        } else if (response.status === 204) {
          setDataTransaction(dataArr);
        }
      }
      setIsLoading(false);
    });
  }, [handleClickCetakTransaction]);

  const listCol = [
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-2",
    "col-1",
    "col-2",
    "col-3",
    "col-2",
  ];

  return (
    <div className="page-content">
      <MetaTags>
        <title>Transaksi</title>
      </MetaTags>

      <div className="container-fluid">
        <h4>Transaksi</h4>

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row className="mb-2">
                  <Col md="12" sm="12" className="d-flex justify-content-end">
                    <Link to="/transaction/create" className="btn btn-primary">
                      Add New Transaction
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col xl="12">
                    <Table
                      column={[
                        "Code",
                        "Tipe",
                        "Konsumen",
                        "Produk",
                        "Berat/Satuan",
                        "Harga Satuan",
                        "Qty",
                        "Subtotal",
                        "Tanggal Transaksi",
                        "Actions",
                      ]}
                      row={dataTransaction}
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

      <ModalLoading isOpen={isModalLoading} />
    </div>
  );
};

export default Index;
