import React from "react";
import { useRef } from "react";

let InputWithLabel = function (props) {
  const inputRef = useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
      <label htmlFor="todoTitle">{props.children}</label>
      <input
        id="todoTitle"
        ref={inputRef}
        name="title"
        type="text"
        value={props.todoTitle}
        onChange={props.handleTitleChange}
      ></input>
    </>
  );
};
export default InputWithLabel;
