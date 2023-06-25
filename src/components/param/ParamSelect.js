import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import "../Qrcode.css";

const ParamList = ({ rendererIndex, paramIndex, value, info, onChange }) => (
  <Select
    className="Qr-select"
    key={"select_" + rendererIndex + "_" + paramIndex}
    value={value}
    style={{ height: 54 }}
    onChange={(val) => onChange({ target: { value: val } })}
  >
    {info.choices.map((choice, index) => {
      return (
        <Select.Option
          key={"option_" + rendererIndex + "_" + paramIndex + "_" + index}
          value={index}
        >
          {choice}
        </Select.Option>
      );
    })}
  </Select>
);

ParamList.propTypes = {
  rendererIndex: PropTypes.number.isRequired,
  paramIndex: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  info: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ParamList;
