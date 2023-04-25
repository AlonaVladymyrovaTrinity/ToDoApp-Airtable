import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import style from "./css/TodoListItem.module.css";

const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Work`;

function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [ascending, setAscending] = React.useState(true);

  React.useEffect(() => {
    fetch(`${API_ENDPOINT}?sort[0][field]=Title&sort[0][direction]=asc`, {
      //Alternatively for sorting with API requests I could use the following query parameters to use Grid View
      //?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        ascending
          ? result.records.sort((objectA, objactB) => {
              if (objectA.fields.Title < objactB.fields.Title) return -1;
              else if (objectA.fields.Title === objactB.fields.Title) return 0;
              else return 1;
            })
          : result.records.sort((objectA, objactB) => {
              console.log(result.records.sort);
              if (objectA.fields.Title < objactB.fields.Title) return 1;
              else if (objectA.fields.Title === objactB.fields.Title) return 0;
              else return -1;
            });
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [ascending]);

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
          <Link to="/">Todo List</Link>
          <Link to="/new">New Todo List</Link>
        </nav>
        <Routes>
          {/* In version 6.8.2 of React Router, the "exact" prop is no longer used. 
      Instead, the path prop is used to match the exact path or a partial path. */}
          <Route
            path="/"
            element={
              <>
                <div className={style.container}>
                  <h1 className={style.header}>
                    <FontAwesomeIcon icon={faClipboardList} /> Todo List
                  </h1>
                  <AddTodoForm onAddTodo={addTodo} />
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : todoList.length === 0 ? (
                    <div className={style["pending-tasks"]}>
                      <span className={style["pending-num"]}>
                        You have no tasks pending.
                      </span>
                    </div>
                  ) : (
                    <>
                      <label htmlFor="switch">
                        Switch ascending and descending
                      </label>
                      <input
                        id="switch"
                        type="checkbox"
                        checked={ascending}
                        onChange={() => setAscending(!ascending)}
                      />
                      <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
                    </>
                  )}
                </div>
              </>
            }
          />
          <Route
            path="/new"
            element={
              <div className={style.container}>
                <h1 className={style.header}>New Todo List</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
