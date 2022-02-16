import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Col } from "reactstrap";

//Import Images
import error from "../../assets/images/error-img.png";

const Error500 = ({ message }) => {
  const handleClickRefresh = e => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <MetaTags>
          <title>500 Error Page</title>
        </MetaTags>
        <Container>
          <Row className="justify-content-center">
            <Col md="8" xl="6">
              <div>
                <img src={error} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h1 className="display-2 font-weight-medium">
                  {/* 5<i className="bx bx-buoy bx-spin text-primary display-3" />0 */}
                  500
                </h1>
                <h4 className="text-uppercase">{message}</h4>
                <div className="mt-5 text-center">
                  <Link
                    className="btn btn-primary "
                    to="#"
                    onClick={handleClickRefresh}
                  >
                    Refresh Page
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Error500.propTypes = {
  message: PropTypes.string,
};

export default Error500;
