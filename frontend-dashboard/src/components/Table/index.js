import React, { memo, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Spinner } from "reactstrap";

const Index = ({ column = [], row = [], isLoading = false, col = [] }) => {
  return (
    <Fragment>
      <div className="table-responsive" style={{ height: 330 }}>
        <Table className="text-center align-middle table-nowrap">
          <thead>
            <tr className={col.length > 0 ? "d-flex" : ""}>
              <th className={col.length > 0 ? "col-1" : ""}>No</th>
              {column.length > 0 &&
                column.map((c, i) => {
                  return (
                    <th key={i} className={col.length > 0 ? col[i] : ""}>
                      {c}
                    </th>
                  );
                })}
            </tr>
          </thead>

          {!isLoading &&
            row &&
            row.length > 0 &&
            row.map((r, i) => (
              <tbody key={i}>
                <tr className={col.length > 0 ? "d-flex" : ""}>
                  <td className={col.length > 0 ? "col-1" : ""}>{i + 1}</td>
                  {Object.keys(r).length > 0 &&
                    Object.keys(r).map((obj, id) => {
                      // !Array.isArray(r[obj])
                      if (obj === "actions") {
                        return (
                          <td
                            key={id}
                            className={col.length > 0 ? col[id] : ""}
                          >
                            {Array.isArray(r[obj]) && (
                              <div className="d-flex gap-3 justify-content-center">
                                {r[obj].map((act, actId) => (
                                  <Link
                                    key={actId}
                                    to="#"
                                    className={act.actClassName}
                                    onClick={act.onClick}
                                  >
                                    {act.text ? (
                                      <Fragment>{act.text}</Fragment>
                                    ) : (
                                      <i className={act.iconClassName} />
                                    )}
                                  </Link>
                                ))}
                              </div>
                            )}

                            {!Array.isArray(r[obj]) && (
                              <Fragment>{r[obj]}</Fragment>
                            )}
                          </td>
                        );
                      } else {
                        return (
                          <Fragment key={id}>
                            <td className={col.length > 0 ? col[id] : ""}>
                              {r[obj]}
                            </td>
                          </Fragment>
                        );
                      }
                    })}
                </tr>
              </tbody>
            ))}
        </Table>

        {!isLoading && !row.length > 0 && (
          <div className="d-flex justify-content-center pt-5 pb-5 text-danger">
            Data Not Found
          </div>
        )}

        {isLoading && (
          <div className="d-flex justify-content-center pt-5 pb-5 text-primary">
            <Spinner />
          </div>
        )}
      </div>
    </Fragment>
  );
};

Index.propTypes = {
  column: PropTypes.array,
  row: PropTypes.any,
  isLoading: PropTypes.bool,
  col: PropTypes.array,
};

export default memo(Index);
