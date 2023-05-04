import React, { useEffect } from "react";
import { useRef } from "react";
import style from "../css/InputWithLabel.module.css";
import PropTypes from "prop-types";
// Functional React component named InputWithLabel with props
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
  // Ref for Input element
  const inputRef = useRef(null);
  // useEffect hook with empty dependency list and callback function that does the following: Focus input ref
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      {/* Label element which renders text from children prop */}
      <label htmlFor={id} className={style["label-input"]}>
        {children}
      </label>
      <div className={style["input-field"]}>
        {/* Input element which is configured as a “controlled component” with “value” and “onChange” attributes */}
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
  handleTitleChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  todoTitle: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default InputWithLabel;
