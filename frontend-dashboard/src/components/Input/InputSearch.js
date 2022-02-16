import React, { memo } from "react";
import PropTypes from "prop-types";

const InputSearch = ({
  value = "",
  name = "",
  onChange = () => {},
  placeholder = "",
}) => {
  return (
    <div className="search-box me-2 d-inline-block">
      <div className="position-relative">
        <label className="search-label">
          <input
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
            placeholder={placeholder || "search..."}
          />
          <i className="bx bx-search-alt search-icon"></i>
        </label>
      </div>
    </div>
  );
};

InputSearch.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(InputSearch);
