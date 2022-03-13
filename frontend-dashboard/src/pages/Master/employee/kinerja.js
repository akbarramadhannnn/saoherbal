import React from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import MetaTags from "react-meta-tags";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// Charts
import Line from "../../../components/Chart/linechart";

const KinerjaGraphic = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Kinerja Karyawan</title>
        </MetaTags>
        <Container fluid={true}>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Karyawan" breadcrumbItem="Kinerja Karyawan" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle>Grafik Transaksi Penjualan</CardTitle>
                  <div id="line-chart" className="e-chart">
                    <Line />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default KinerjaGraphic;
