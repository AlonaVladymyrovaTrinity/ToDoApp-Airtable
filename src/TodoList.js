import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";

let TodoList = function ({ todoList, onRemoveTodo }) {
  return (
    <ul className={style.ListItem}>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            onRemoveTodo={onRemoveTodo}
            key={todo.id}
            id={todo.id}
            title={todo.fields.Title}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
