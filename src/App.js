import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
let useSemiPersistentState = () => {
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("");
  // This code creates a new array called newTodoList by filtering the existing
  // todoList array to remove the item with the given id. Then, it calls the
  // setTodoList state setter and passes the new newTodoList array as its argument
  // to update the state with the modified todoList.
  let removeTodo = function (id) {
    const newTodoList = todoList.filter((todo) => todo.id !== id); //The filter method creates a new array with all the elements that pass the conditions specified by a given function and returns the new array.
    setTodoList(newTodoList);
  };

  let addTodo = function (newTodo) {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
    </>
  );
}

export default App;
