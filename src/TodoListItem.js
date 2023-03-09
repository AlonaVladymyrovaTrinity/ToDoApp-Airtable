import React from "react";
import style from "./TodoListItem.module.css";

let TodoListItem = function ({ id, title, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      <span>{title} </span>
      <button onClick={() => onRemoveTodo(id)} type="button">
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
