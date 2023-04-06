import React, { useEffect } from "react";
import { useRef } from "react";
import style from "./TodoListItem.module.css";

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
export default InputWithLabel;
