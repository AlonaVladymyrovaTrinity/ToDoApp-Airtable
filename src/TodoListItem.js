import React from "react";
import style from "./TodoListItem.module.css";

let TodoListItem = function ({ id, title, onRemoveTodo }) {
  return (
    <li className={style.list}>
      <span>{title}</span> {/*className={style.title}*/}
      <button onClick={() => onRemoveTodo(id)} type="button" className={style["delete-button"]}>
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
