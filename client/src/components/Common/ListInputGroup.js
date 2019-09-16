import React from "react";
import PropTypes from "prop-types";

const ListInputGroup = ({ name, value, onChange, options, error }) => {
  const selectOption = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div>
      <div className="form-group">
        <div className="text-left">
          <label className="field-empty">
            <select
              name={name}
              value={value}
              onChange={onChange}
              className={error ? "invalidInput" : ""}
            >
              {selectOption}
            </select>
          </label>
          {error && <div className="invalidFeedback">{error}</div>}
        </div>
      </div>
    </div>
  );
};

ListInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  palceholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string
};

export default ListInputGroup;
