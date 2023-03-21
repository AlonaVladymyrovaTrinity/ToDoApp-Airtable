import React from "react";
import { useRef } from "react";

let InputWithLabel = function ({id, name, placeholder, title, type, todoTitle, onChange, children}) {
  const inputRef = useRef(null);
  React.useEffect(() => {
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
        value={todoTitle}
        onChange={onChange}
      ></input>
    </>
  );
};
export default InputWithLabel;
