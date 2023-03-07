import React from "react";
import TodoListItem from "./TodoListItem";

let TodoList = function ({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            onRemoveTodo={onRemoveTodo}
            key={todo.id}
            id={todo.id}
            // I updated the todo item title to reference the new object format here:
            title={todo.fields.Title}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
