import React from "react";
import TodoListItem from "./TodoListItem";

let TodoList = function ({ todoList, onRemoveTodo, onSaveTodo, editTitle }) {
  return (
    <ul>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            editTitle={editTitle}
            onSaveTodo={onSaveTodo}
            onRemoveTodo={onRemoveTodo}
            key={todo.id}
            //id={todo.id}
            todo={todo} 
            // title={todo.fields.Title}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
