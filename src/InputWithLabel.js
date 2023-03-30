import React, { useEffect } from "react";
import { useRef } from "react";

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
      <label htmlFor={id}>{children}</label>
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
    </>
  );
};
export default InputWithLabel;
