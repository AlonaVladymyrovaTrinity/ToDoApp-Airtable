import React from "react";
import { useRef } from "react";
import style from "./TodoListItem.module.css";

let InputWithLabel = function (props) {
  const inputRef = useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      {/* <div className={style["label-input"]}> */}
          <label htmlFor="todoTitle">{props.children}</label>
          <div className={style["input-field"]}> 
            <input 
              id="todoTitle"
              ref={inputRef}
              name="title"
              type="text"
              value={props.todoTitle}
              onChange={props.handleTitleChange}
            ></input>
          </div>
      {/* </div>     */}
    </>
  );
};
export default InputWithLabel;
