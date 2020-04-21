import React from "react";
import classnames from "classnames";

const SelectList = ({ name, placeholder, onChange, value, error, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg ", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      >
        {selectOptions}
      </select>

      {error && <div className="invalid-feedback">{error} </div>}
    </div>
  );
};

export default SelectList;
