import React, { memo, useEffect, useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";

const Index = ({
  totalPage,
  currentPage,
  prevPage,
  nextPage,
  setPagination,
}) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (totalPage && currentPage) {
      const limit = 5;
      if (currentPage <= 3) {
        if (totalPage >= limit) {
          setPages(
            Array(limit)
              .fill()
              .map((_, i) => i + 1)
          );
        } else {
          setPages(
            Array(totalPage)
              .fill()
              .map((_, i) => i + 1)
          );
        }
      } else if (currentPage === 4 && totalPage === 4) {
        setPages(
          Array(totalPage)
            .fill()
            .map((_, i) => i + 1)
        );
      } else {
        if (currentPage < totalPage - 2) {
          setPages(
            Array(currentPage + 2)
              .fill()
              .map((_, i) => i + 1)
              .splice(currentPage - 3, limit)
          );
        } else {
          setPages(
            Array(totalPage)
              .fill()
              .map((_, i) => i + 1)
              .splice(totalPage - limit, limit)
          );
        }
      }
    }
  }, [totalPage, currentPage]);

  const handlePrevPage = useCallback(page => {
    setPagination(oldState => ({
      ...oldState,
      currentPage: page,
    }));
  }, []);

  const handleNextPage = useCallback(page => {
    setPagination(oldState => ({
      ...oldState,
      currentPage: page,
    }));
  }, []);

  const handleCurrentPage = useCallback(page => {
    setPagination(oldState => ({
      ...oldState,
      currentPage: page,
    }));
  }, []);

  return (
    <Fragment>
      {pages.length > 0 && (
        <div className="pagination pagination-rounded justify-content-center justify-content-md-end">
          <ul className="pagination react-bootstrap-table-page-btns-ul">
            <li className="page-item" title="next-page">
              <button
                onClick={() => handlePrevPage(prevPage)}
                className="page-link"
                disabled={prevPage ? false : true}
              >
                <i
                  className={`fas fa-angle-left ${
                    prevPage ? "text-primary" : "text-secondary"
                  }`}
                ></i>
              </button>
            </li>

            {pages.map((page, i) => (
              <li
                className={`page-item ${page === currentPage && "active"}`}
                key={i}
              >
                <button
                  onClick={() => handleCurrentPage(page)}
                  className="page-link"
                >
                  {page}
                </button>
              </li>
            ))}

            <li className="page-item" title="next-page">
              <button
                onClick={() => handleNextPage(nextPage)}
                className="page-link"
                disabled={currentPage < nextPage ? false : true}
              >
                <i
                  className={`fas fa-angle-right ${
                    currentPage < nextPage ? "text-primary" : "text-secondary"
                  }`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      )}
    </Fragment>
  );
};

Index.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  prevPage: PropTypes.number,
  nextPage: PropTypes.number,
  setPagination: PropTypes.func,
};

export default memo(Index);
