import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";

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

export default TodoList;
