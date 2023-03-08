import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records); //result.hits ??
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
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
    <BrowserRouter>
      <nav>
        <ul>
          <Link to="/">Todo List</Link> | <Link to="/new">New Todo List</Link>
        </ul>
      </nav>
      <Routes>
        {/* In version 6.8.2 of React Router, the "exact" prop is no longer used. 
      Instead, the path prop is used to match the exact path or a partial path. */}
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
