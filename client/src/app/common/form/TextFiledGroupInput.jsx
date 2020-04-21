import React from "react";
import classnames from "classnames";

const TextFiledGroupInput = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  error,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg ", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error} </div>}
    </div>
  );
};

export default TextFiledGroupInput;
