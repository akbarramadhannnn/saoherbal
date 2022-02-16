import React, { memo } from "react";
import PropTypes from "prop-types";
import Switch from "react-switch";

const Index = ({
  isChecked = true,
  onColor = "#dcdcdc",
  unCheckedText = "",
  checkedText = "",
  onChange = () => {},
}) => {
  return (
    <Switch
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          {" "}
          {unCheckedText}
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
          }}
        >
          {" "}
          {checkedText}
        </div>
      }
      onColor={onColor}
      onChange={onChange}
      checked={isChecked}
    />
  );
};

Index.propTypes = {
  isChecked: PropTypes.bool,
  title: PropTypes.string,
  onColor: PropTypes.string,
  unCheckedText: PropTypes.string,
  checkedText: PropTypes.string,
  onChange: PropTypes.func,
};

export default memo(Index);
