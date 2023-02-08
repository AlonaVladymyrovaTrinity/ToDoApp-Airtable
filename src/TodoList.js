import React from 'react';
import TodoListItem from './TodoListItem';

let TodoList = function({ todoList }) {
return ( 
    <ul>
        {todoList.map (function (todo) {
          return <TodoListItem key={todo.id} id={todo.id} title={todo.title}/>; // Inside the map() method, use the TodoListItem component; Pass key as a prop equal to the id of the todo object; Pass todo as a prop
        })}
    </ul>
);
}

export default TodoList;