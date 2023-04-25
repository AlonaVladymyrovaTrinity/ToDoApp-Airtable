import React, { useEffect } from "react";
import { useRef } from "react";
import style from "../css/InputWithLabel.module.css";
import PropTypes from "prop-types";

let InputWithLabel = function ({
  id,
  name,
  placeholder,
  todoTitle,
  type,
  value,
  handleTitleChange,
  children,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor={id} className={style["label-input"]}>
        {children}
      </label>
      <div className={style["input-field"]}>
        <input
          id={id}
          ref={inputRef}
          name={name}
          placeholder={placeholder}
          title={todoTitle}
          type={type}
          value={value}
          onChange={handleTitleChange}
        />
      </div>
    </>
  );
};

InputWithLabel.propTypes = {
  children: PropTypes.object,
  // children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default InputWithLabel;
