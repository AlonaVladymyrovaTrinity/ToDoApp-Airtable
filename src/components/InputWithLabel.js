import React, { useEffect } from "react";
import { useRef } from "react";
import style from "../css/TodoListItem.module.css";
import PropTypes from "prop-types";

let InputWithLabel = function ({
  id,
  name,
  placeholder,
  title,
  type,
  value,
  onChange,
  children,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      {/* <div className={style["label-input"]}> */}
      <label htmlFor={id}>{children}</label>
      <div className={style["input-field"]}>
        <input
          id={id}
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          title={title}
          type={type}
          value={value}
          onChange={onChange}
        ></input>
      </div>
      {/* </div>     */}
    </>
  );
};

InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default InputWithLabel;
