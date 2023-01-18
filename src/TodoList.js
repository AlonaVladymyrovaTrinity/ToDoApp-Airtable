import React from 'react';
const todoList = [
    {
      id: 1,
      title: "Reed the book",
    }, {
      id: 2,
      title: "Watch the videos",
    }, {
      id: 3,
      title: "Complete assignment"
    } ];

let TodoList = function() {
return ( 
    <ul>
          hint: {todoList.map (function (item) {
          return <li key = {item.id}>
                    <span>{`${item.id} ${item.title}`}</span>
                 </li>;
                
        })}
        </ul>

);
}

export default TodoList;