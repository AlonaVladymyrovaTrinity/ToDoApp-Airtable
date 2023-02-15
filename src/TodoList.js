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
            title={todo.title}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
