import React from "react";
//I did this step in file TodoList.js
// Open src/TodoListItem.js
// Update the todo item title to reference the new object format (hint: todo.fields.Title)
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
