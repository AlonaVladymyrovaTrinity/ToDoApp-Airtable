import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import style from "./TodoListItem.module.css";

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
        setTodoList(result.records); 
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
    <>
    <BrowserRouter>
      <nav className={style.navigation}>
        
          <Link to="/">Todo List</Link><Link to="/new">New Todo List</Link>
        
      </nav>
      <Routes>
        {/* In version 6.8.2 of React Router, the "exact" prop is no longer used. 
      Instead, the path prop is used to match the exact path or a partial path. */}
        <Route
          path="/"
          element={
            <>
              <div className={style.container}>
              <h1><FontAwesomeIcon icon={faClipboardList} /> Todo List</h1> {/*className={style.header}*/}
                <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    (todoList.length === 0) ? (
                      <div className={style["pending-tasks"]}>
                      <span className={style["pending-num"]}>You have no tasks pending.</span>
                      </div>
                    ) :
                    <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
                  ) 
                  }
              </div>
            </>
          }
        />
        <Route path="/new" element={<h1 className={style.container}>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
