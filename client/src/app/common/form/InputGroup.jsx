import React from "react";
import classnames from "classnames";

const InputGroup = ({ name, placeholder, onChange, value, error,icon,type }) => {
  return (
    <div className="input-group mb-3">
      <div className='input-group-prepend'>
        <span className='input-group-text'>
          <i className={icon}/>
        </span>
      </div>
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

export default InputGroup;