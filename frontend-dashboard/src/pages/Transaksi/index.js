import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Row, Col, Card, CardBody } from "reactstrap";
import Table from "./../../components/Table";
import { ConvertToRupiah } from "./../../utils/convert";

import { ApiGetListTransaction } from "../../api/transaction";

const Index = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleGetData();
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
            });
          }
          setDataTransaction(dataArr);
        } else if (response.status === 204) {
          setDataTransaction(dataArr);
        }
      }
      setIsLoading(false);
    });
  }, []);

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
                        // "Actions",
                      ]}
                      row={dataTransaction}
                      isLoading={isLoading}
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

export default Index;
