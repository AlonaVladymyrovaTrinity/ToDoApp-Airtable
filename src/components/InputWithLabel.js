import React from "react";
import { useRef } from "react";
import style from "../css/TodoListItem.module.css";
import PropTypes from "prop-types";

let InputWithLabel = function (props) {
  const inputRef = useRef(null);
  React.useEffect(() => {
    inputRef.current.focus();
  });
  // console.log(typeof props.todoTitle);
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
InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
export default InputWithLabel;
