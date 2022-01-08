import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { Container } from "reactstrap";

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>Toko | Sao</title>
          </MetaTags>
          <Container fluid>
            <h4>Toko</h4>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
