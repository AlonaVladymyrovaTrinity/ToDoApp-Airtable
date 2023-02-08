import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
//Above the App functional component, create a new function named useSemiPersistentState which will be a custom hook
let useSemiPersistentState  = () => {
  const [todoList, setTodoList] = React.useState(JSON.parse(localStorage.getItem('savedTodoList')) || []); // Update the default state for todoList to read your "savedTodoList" item from localStorage; Update your default state to parse the value of the "savedTodoList" item
//Define a useEffect React hook with todoList as a dependency
// Inside the side-effect handler function, save the todoList inside localStorage with the key "savedTodoList"
  React.useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList)); // Update your side-effect function to convert todoList to a string before saving in localStorage
  }, [todoList]);
  return (
    [todoList, setTodoList]  );
};

function App() {
//use the new custom hook
const [todoList, setTodoList] = useSemiPersistentState("");

let addTodo = function(newTodo) {
  setTodoList([...todoList, newTodo])
}
  return (
    <>
      <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo}/>
        <TodoList todoList={todoList}/>
    </>
    );
}

export default App;