import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import MetaTags from "react-meta-tags";

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import "./datatables.scss";
import { Link } from "react-router-dom";

// Table data
const products = [
  {
    id: 1,
    name: "Pupuk Cair",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 2,
    name: "Pupuk Padat",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 3,
    name: "Racun Rumput",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 4,
    name: "Pupuk Buah",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 5,
    name: "Pupuk Batang",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 6,
    name: "Brielle Williamson",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 7,
    name: "Bruno Nash",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 8,
    name: "Caesar Vance",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 9,
    name: "Cara Stevens",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 10,
    name: "Cedric Kelly",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 11,
    name: "Marshall",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 12,
    name: "Hurst",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 13,
    name: "Rios",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 14,
    name: "Snider",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 15,
    name: "Wilder",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },

  {
    id: 16,
    name: "Camacho",
    product: "ada",
    varian: "ada",
    jenis: "1kg",
    img: "Image",
  },
];

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      sizePerPage: 10,
      productData: products,
    };
  }

  render() {
    const columns = [
      {
        dataField: "id",
        text: "Id",
        sort: true,
      },
      {
        dataField: "name",
        text: "Name",
        sort: true,
      },
      {
        dataField: "",
        text: "Action",
        formatter: (cellContent, order) => (
          <>
            <div className="d-flex gap-3">
              <Link to="#" className="text-success">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                  onClick={() => this.handleOrderClick(order)}
                />
              </Link>
              <Link to="#" className="text-danger">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                  onClick={() => this.onClickDelete(order)}
                />
              </Link>
            </div>
          </>
        ),
      },
    ];

    const defaultSorted = [
      {
        dataField: "id",
        order: "asc",
      },
    ];

    const pageOptions = {
      sizePerPage: 10,
      totalSize: products.length, // replace later with size(customers),
      custom: true,
    };

    // Custom Pagination Toggle
    const sizePerPageList = [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "25", value: 25 },
      { text: "All", value: this.state.productData.length },
    ];

    // Select All Button operation
    // const selectRow = {
    //   mode: "checkbox",
    // };

    const { SearchBar } = Search;

    return (
      <React.Fragment>
        <div className="page-content">
          <MetaTags>
            <title>product</title>
          </MetaTags>
          <div className="container-fluid">
            {/* <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" /> */}

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="id"
                      columns={columns}
                      data={this.state.productData}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          columns={columns}
                          data={this.state.productData}
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                  <div className="search-box me-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar
                                        {...toolkitProps.searchProps}
                                      />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Link to="/master/product/create">
                                      Add new product
                                    </Link>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      // selectRow={selectRow}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;
