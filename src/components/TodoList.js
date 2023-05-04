import React from "react";
import TodoListItem from "./TodoListItem";
import baseStyles from "../css/base.module.css";
import PropTypes from "prop-types";

// Functional React component named TodoList with props: todoList and onRemoveTodo
const TodoList = ({
  onRemoveTodo,
  onSaveTodo,
  onIsDoneUpdateVal,
  todoList,
  setTodoList,
  isLoading,
  tableName,
}) => {
  return (
    // Unordered list element
    <ul className={baseStyles.ListItem}>
      {/* map statement which loops through todoList Array and returns TodoListItem Component*/}
      {todoList?.map(function (todo) {
        return (
          <React.Fragment key={todo.id}>
            <TodoListItem
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              onSaveTodo={onSaveTodo}
              onIsDoneUpdateVal={onIsDoneUpdateVal}
              key={todo.id}
              todoList={todoList}
              setTodoList={setTodoList}
              isLoading={isLoading}
              tableName={tableName}
            />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  onRemoveTodo: PropTypes.func,
  onSaveTodo: PropTypes.func,
  onIsDoneUpdateVal: PropTypes.func,
  todoList: PropTypes.array,
  setTodoList: PropTypes.func,
  isLoading: PropTypes.bool,
  tableName: PropTypes.string,
};

export default TodoList;
