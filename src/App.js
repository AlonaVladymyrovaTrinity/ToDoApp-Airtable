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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
        <ul>
          hint: {todoList.map (function (item) {
          return <li key = {item.id}>
                    <span>{item.id}</span>
                    <span>{item.title}</span>
                 </li>;
                
        })}
        </ul>
    </div>
    );
}

export default App;