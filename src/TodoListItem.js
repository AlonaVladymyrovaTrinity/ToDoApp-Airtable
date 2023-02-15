import React from "react";
let TodoListItem = function ({ id, title, onRemoveTodo }) {
  return (
    <li>
      <span>{title} </span>
      <button onClick={() => onRemoveTodo(id)} type="button">
        Remove
      </button>
    </li>
  );
};

export default TodoListItem;
