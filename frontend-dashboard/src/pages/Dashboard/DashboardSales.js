import React from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";

const DashboardSales = () => {
  return (
    <div className="page-content">
      <MetaTags>
        <title>Dashboard | SAO Herbal</title>
      </MetaTags>
      <Container fluid>
        <h2>Dashboard Sales</h2>
      </Container>
    </div>
  );
};

export default DashboardSales;
