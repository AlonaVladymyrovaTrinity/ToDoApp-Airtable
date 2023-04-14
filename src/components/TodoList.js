import React from "react";
import TodoListItem from "./TodoListItem";
import style from "../css/TodoListItem.module.css";
import PropTypes from "prop-types";

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
    <ul className={style.ListItem}>
      {todoList?.map(function (todo) {
        return (
          <React.Fragment key={todo.id}>
            <TodoListItem
              todo={todo}
              onRemoveTodo={onRemoveTodo}
              // onRemoveTodo={(id) =>
              //   onRemoveTodo(id, isLoading, todoList, setTodoList, tableName)
              // }
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
