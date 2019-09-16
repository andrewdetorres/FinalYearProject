import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({ name, palceholder, value, type, onChange, error }) => {
  return (
    <div>
      <div className="form-group">
        <div className="text-left">
          <label className="field-empty">
            <input
              type={type}
              placeholder={palceholder}
              name={name}
              value={value}
              onChange={onChange}
              className={error ? "invalidInput" : ""}
            />
          </label>
          {error && <div className="invalidFeedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
