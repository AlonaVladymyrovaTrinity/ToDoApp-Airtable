import React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";

let TodoList = function ({
  onRemoveTodo,
  onSaveTodo,
  onIsDoneUpdateVal,
  todoList,
  setTodoList,
  isLoading,
}) {
  return (
    <ul className={style.ListItem}>
      {todoList?.map(function (todo) {
        return (
          <TodoListItem
            todo={todo}
            onRemoveTodo={(id) =>
              onRemoveTodo(id, isLoading, todoList, setTodoList)
            }
            onSaveTodo={onSaveTodo}
            onIsDoneUpdateVal={onIsDoneUpdateVal}
            key={todo.id}
            todoList={todoList}
            setTodoList={setTodoList}
            isLoading={isLoading}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
