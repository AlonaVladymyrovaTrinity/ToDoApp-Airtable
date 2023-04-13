import React from "react";
import TodoListItem from "./TodoListItem";
import style from "../css/TodoListItem.module.css";
import PropTypes from "prop-types";

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

TodoList.propTypes = {
  onRemoveTodo: PropTypes.func,
  todoList: PropTypes.array,
};

export default TodoList;
