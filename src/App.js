import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = React.useState([]);

  /*-----Removed the newTodo state variable-------*/
  //const [newTodo, setNewTodo] = React.useState("");
  /*----------------------------------------------*/

  /*Call the setTodoList state setter and use the 
  spread operator to pass the existing Objects 
  in the todoList Array along with the newTodo Object*/
let addTodo = function(newTodo) {
  setTodoList([...todoList, newTodo])
}
  return (
    <div>
      <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo}/>
         {/* -----remuved----- */}
         {/* <p>Added to list: {newTodo}</p> */}
         {/* ----------------- */}
        <TodoList todoList={todoList}/>
    </div>
    );
}

export default App;