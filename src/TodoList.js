import React from "react";
import TodoListItem from "./TodoListItem";

let TodoList = function ({ todoList, onRemoveTodo, onSaveTodo, editTitle, setTodoList, updateAirtableRecord, isLoading }) {
  return (
    <ul>
      {todoList.map(function (todo) {
        return (
          <TodoListItem
            editTitle={editTitle}
            onSaveTodo={onSaveTodo}
            onRemoveTodo={(id) => onRemoveTodo(id, isLoading, todoList, setTodoList)}
            key={todo.id}
            // id={todo.id}
            todo={todo} 
            todoList={todoList}
            setTodoList={setTodoList}
            isLoading={isLoading}
            updateAirtableRecord={updateAirtableRecord}
            // title={todo.fields.Title}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
