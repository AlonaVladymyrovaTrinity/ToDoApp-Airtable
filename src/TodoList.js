import React from "react";
import TodoListItem from "./TodoListItem";

let TodoList = function ({ onRemoveTodo, onSaveTodo, todoList, setTodoList, isLoading }) {
return (
  <ul>
    {todoList?.map(function (todo) {
        return (
          <TodoListItem
            todo={todo}
            onRemoveTodo={(id) => onRemoveTodo(id, isLoading, todoList, setTodoList)}
            onSaveTodo={onSaveTodo}
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
