import React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/`;

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`, //Bearer YOUR_SECRET_API_TOKEN
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records); //result.hits ??
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
      )}
    </>
  );
}

export default App;
